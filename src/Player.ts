import { Color, Position, TOP } from "./utils/type";

class Player {
  private color: Color;
  private position: Position;
  private name: string;

  constructor(color: Color, position: Position, name: string) {
    this.name = name;
    this.position = position;
    this.color = color;
  }

  public toStr() {
    return `${this.name} the ${this.color} player`;
  }

  public equals(player: Player) {
    return this.color === player.color;
  }

  public isTop() {
    return this.position === TOP;
  }
}
export default Player;
