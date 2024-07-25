import { User } from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import { sendEmail } from "../../email/email.js";
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const signup=catchError(async(req,res)=>{
    req.body.password=bcrypt.hashSync(req.body.password,8)
    // let user =await User.insertMany(req.body)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        otpCode: req.body.otpCode,
        otpExpired: req.body.otpExpired
      });
  
      const user = await newUser.save();
      sendEmail(req.body.email,req.body.otpCode)
      user.password = undefined;

    res.status(201).json({message:'success',user})
})

const verifyOtp = catchError(async (req, res,next) => {
    const userId=req.params.id
    const otpCode=req.body.otpCode
    
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('User not found',404))
    }
    
    if (user.otpCode !== otpCode) {
        return next(new AppError('Invalid OTP',400))
    }
    
    if (user.otpExpired < new Date()) {
        return next(new AppError('OTP expired',400))
    }
    
    res.status(200).json({ message: 'OTP verified successfully' });
    
    }
    )

const regenerateOtp = catchError(async (req, res,next) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError('User not found',404))
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpired = new Date(Date.now() + 10 * 60 * 1000); 

    user.otpCode = otpCode;
    user.otpExpired = otpExpired;
    await user.save();

    sendEmail(user.email, otpCode);

    res.status(200).json({ message: 'OTP regenerated successfully' });
}
)


const signin=catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user || !bcrypt.compareSync(req.body.password,user.password))
        return next(new AppError('Invalid email or password',400))
    jwt.sign({userId:user._id,role:user},'aykey32char',(err,token)=>{
        if(err)return next(new AppError('Something went wrong',500))
            res.status(200).json({message:'Login successful',token:token})
    })
    
})


export{
    signup,signin,verifyOtp,regenerateOtp
}