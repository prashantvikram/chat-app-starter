import { Document, Schema, Model, model } from "mongoose";
import User from "./user";

// interface

export interface IRoom extends Document {
  member1: Schema.Types.ObjectId;
  member2: Schema.Types.ObjectId;
  lastActive: Date;
}

// one on one and group chats - both are stored as namespaces
// group chats will have isGroup set to true and more than 2 users

export const RoomSchema: Schema = new Schema({
  member1: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  member2: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Room: Model<IRoom> = model<IRoom>("Room", RoomSchema);
export default Room;