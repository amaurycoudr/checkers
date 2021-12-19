import { BLACK, Color, Side, TOP, WHITE } from "./utils/type";

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

  public getColor() {
    return this.color;
  }
}
export default Player;
class PlayerWhite extends Player {
  constructor(side: Side, name: string) {
    super(WHITE, side, name);
  }
}
export { PlayerWhite };

class PlayerBlack extends Player {
  constructor(side: Side, name: string) {
    super(BLACK, side, name);
  }
}
export { PlayerBlack };
