export interface UserModel {
  _id: string;
  username: string;
  isOnline: boolean
}

export interface RoomModel {
  _id: string;
  members: Array<UserModel>
}

export interface MessageModel {
  _id?: string;
  roomId: string;
  message: string;
  from: UserModel;
  date?: Date
}