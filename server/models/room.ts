import { Document, Schema, Model, model } from "mongoose";
import User from "./user";

// interface
export interface IRoom extends Document {
  members: [Schema.Types.ObjectId];
  lastActive: Date;
}

export const RoomSchema: Schema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


const Room: Model<IRoom> = model<IRoom>("Room", RoomSchema);
export default Room;