process.on('uncaughtException',(err)=>{
    console.log('error in code',err)
})

import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import msgRouter from './src/modules/message/message.routes.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'

const app =express()
const port=3000
app.use(express.json())

app.use('/auth',userRouter)
app.use('/message',msgRouter)
app.use('*',(req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})    

app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error outside express',err)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))