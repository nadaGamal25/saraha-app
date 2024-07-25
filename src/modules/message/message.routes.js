import express from 'express'
import { addMsg, deleteMsg, readMsgs } from './message.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { validate } from '../../middleware/validate.js'
import { addMsgVal, deleteMsgVal } from './message.validation.js'

const msgRouter=express.Router()

msgRouter.post('/addMsg',validate(addMsgVal),addMsg)
msgRouter.get('/all',verifyToken,readMsgs)
msgRouter.delete('/deleteMsg/:id',verifyToken,validate(deleteMsgVal),deleteMsg)


export default msgRouter