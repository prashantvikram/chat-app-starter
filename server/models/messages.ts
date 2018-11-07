import { Document, Schema, Model, model } from "mongoose";
import User from "./user";
import Room from "./room";

export interface IMessages extends Document {
  roomId: Schema.Types.ObjectId;
  message: string;
  from: Schema.Types.ObjectId;
  date: Date;
}

export const MessagesSchema: Schema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: Room
  },
  message: {
    type: String,
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Messages: Model<IMessages> = model<IMessages>("Messages", MessagesSchema);
export default Messages;