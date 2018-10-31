import { Request, Response, NextFunction } from "express";
// import socketIO from "socket.io";
// import * as http from "http";
// import app from "../app";
// import v4 from "uuid/v4";
import Room, { IRoom } from "../models/room";
import User from "../models/user";

export class RoomController {
  public getUserRooms(req: Request, res: Response, next: NextFunction): any {
    Room.find({ "members": req.query.id })
        .populate({ path: "members", select: "username", model: User })
        .exec(
          function(err: any, rooms: IRoom[]): any {
            if (err) {
              return next(err);
            }
            return res.json(rooms);
          }
        );
  }

  // create a new room for one on one conversation or for a group
  public createRoom(req: Request, res: Response, next: NextFunction): any {
    // let HTTP: any = new http.Server(app);
    // let io: socketIO.Server = socketIO(HTTP);
    // let v: string = v4();
    // let nsp: socketIO.Namespace = io.of(`/${v}`);
    // nsp.on("connection", function (socket: socketIO.Socket): void {
    //   console.log("added...");
    // });

    let newRoom: IRoom = new Room (req.body);
    newRoom.save(function(err: any, room: IRoom): any {
      if(err) {
        return next(err);
      }
      return res.json(room.id);
    });
  }

  // delete a room

  // add user to a room

  // remove user from a room

  // send message to a room

  // is typing

  // get all message from a conversation
}