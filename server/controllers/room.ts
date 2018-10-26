import { Request, Response } from "express";
import socketIO from "socket.io";
import * as http from "http";
import app from "../app";
import v4 from "uuid/v4";
// import Room, { IRoom } from "../models/room";

export class RoomController {
  // create a new room for one on one conversation or for a group
  public createRoom(req: Request, res: Response): Response {
    let HTTP: any = new http.Server(app);
    let io: socketIO.Server = socketIO(HTTP);
    let v: string = v4();
    let nsp: socketIO.Namespace = io.of(`/${v}`);
    nsp.on("connection", function (socket: socketIO.Socket): void {
      console.log("added...");
    });

    // let newRoom: IRoom = new Room ();
    // newRoom.name = v;
    // newRoom.save(err => {
    //   if(err) {
    //     throw err;
    //   }
    // });
    return res.json(v);
  }

  // delete a room

  // add user to a room

  // remove user from a room

  // send message to a room

  // is typing

  // get all message from a conversation
}