import { Color, Side, TOP } from "./utils/type";

class Player {
  private color: Color;
  private position: Side;
  private name: string;

  constructor(color: Color, position: Side, name: string) {
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
