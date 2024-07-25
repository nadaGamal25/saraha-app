import express from 'express'
import { regenerateOtp, signin, signup, verifyOtp } from './user.controller.js'
import { checkEmailExist } from '../../middleware/checkEmailExist.js'
import { generateOtp } from '../../middleware/generateOtp.js'
import { validate } from '../../middleware/validate.js'
import { signinVal, signupVal } from './user.validation.js'

const userRouter=express.Router()

userRouter.post('/signup',validate(signupVal),checkEmailExist,generateOtp,signup)
userRouter.post('/signin',validate(signinVal),signin)
userRouter.post('/verify/:id',verifyOtp)
userRouter.post('/regenerate-otp/:id',regenerateOtp)


export default userRouter