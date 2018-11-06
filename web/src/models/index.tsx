export interface UserModel {
  id: string;
  username: string;
}

export interface FriendModel {
  _id: string;
  username: string;
  isOnline: boolean
}

export interface RoomModel {
  _id: string;
  members: Array<FriendModel>,
  lastActive: Date
}

enum MessageType {
  "TEXT",
  "IMAGE"
}

export interface MessageModel {
  id: string;
  by: UserModel,
  to: RoomModel,
  on: Date,
  type: MessageType,
  content: any
}