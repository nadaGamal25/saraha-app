import { Schema, model } from "mongoose";

const messageScheme=new Schema({
    content:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    }
})

export const Message=model('Message',messageScheme)