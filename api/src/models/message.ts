import { response } from 'express';
import {model, Schema} from 'mongoose';

export type TMessage = {
    socketId: string;
    message: string;
    timestamp: Date;
    response: string,
    status: string,
}

export interface IMessage extends TMessage, Document{};

const messageSchema =  new Schema({
    socketId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    response: {
        type: String,
    },
    timestamp:{
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Replied"],
        default:"Pending", 
    },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;