import Joi from 'joi'


const signupVal=Joi.object({
    username:Joi.string().min(3).max(50).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required(),
    repassword:Joi.string().valid(Joi.ref('password'))
})

const signinVal=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required(),
})

export{
    signupVal,signinVal
}