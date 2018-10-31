import { User } from "./user";
import { Room } from "./room";
import { PassportStatic } from "passport";

export class Routes {

  private user: User;
  private rooms: Room;

  constructor(passport: PassportStatic) {
    this.user = new User(passport);
    this.rooms = new Room();
  }

  public allRoutes(app: any): void {
    this.user.routes("/user", app);
    this.rooms.routes("/rooms", app);
  }
}