import { Color, Position } from "./utils/type";

class Player {
  private color: Color;
  private position: Position;
  private name: string;

  constructor(color: Color, position: Position, name: string) {
    this.name = name;
    this.position = position;
    this.color = color;
  }
}
export default Player;
