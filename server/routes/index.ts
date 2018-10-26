import { User } from "./user";
import { Room } from "./room";
import { PassportStatic } from "passport";

export class Routes {

  private user: User;
  private api: Room;

  constructor(passport: PassportStatic) {
    this.user = new User(passport);
    this.api = new Room();
  }

  public allRoutes(app: any): void {
    this.user.routes("/user", app);
    this.api.routes("/api", app);
  }
}