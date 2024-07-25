import { Message } from "../../../database/models/message.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"


const addMsg=catchError(async(req,res)=>{
    let msg =await Message.insertMany(req.body)
    res.status(201).json({message:'success',msg})
})

const readMsgs=catchError(async(req,res)=>{
    let msgs=await Message.find({receiverId:req.user.userId})
    res.status(200).json({message:'success',msgs})
    
}
)

const deleteMsg=catchError(async(req,res,next)=>{
    let msg=await Message.findByIdAndDelete(req.params.id)
    if (!msg) {
        return next(new AppError('msg not found',404))
    }
    res.status(200).json({message:'success'})   
})

export{
    addMsg,readMsgs,deleteMsg
}