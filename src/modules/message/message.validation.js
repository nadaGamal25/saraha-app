import Joi from 'joi'


const addMsgVal=Joi.object({
    content:Joi.string().min(3).max(1000).required(),
    receiverId:Joi.string().hex().length(24).required(),
})

const deleteMsgVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addMsgVal,deleteMsgVal
}