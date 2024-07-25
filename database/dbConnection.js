import mongoose from "mongoose"


export const dbConnection= mongoose.connect('mongodb://127.0.0.1:27017/sarahaApp').then(()=>{
    console.log('connected to mongoDB')
})