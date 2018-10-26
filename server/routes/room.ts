import { RoomController } from "../controllers/room";

export class Room {
  public roomController: RoomController = new RoomController();

  public routes(endpoint: string, app: any): void {
    app.route(`${endpoint}/create_room`)
      .get(this.roomController.createRoom);
  }
}