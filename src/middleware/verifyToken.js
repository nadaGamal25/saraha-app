import jwt, { decode } from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing from authorization header' });
  }
    // let token=req.headers
    jwt.verify(token,'aykey32char',async(err,decode)=>{
        if(err){
            return res.status(401).json({message:'Invalid token',error:err})
            }
            req.user=decode
            next()
    })
}