import { Json, Utils } from "../genericInterface";
import { BLACK, Color, WHITE } from "../utils/type";

export type PlayerJSON = { color: Color };
class Player implements Utils {
  private color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public toStr() {
    return `${this.color} player`;
  }

  public equals(player: Player) {
    return this.color === player.color;
  }

  public isTop() {
    return this.color === BLACK;
  }

  public getColor() {
    return this.color;
  }
}
export default Player;
class PlayerWhite extends Player {
  constructor(name: string) {
    super(WHITE);
  }
}
export { PlayerWhite };
export { PlayerBlack };

class PlayerBlack extends Player {
  constructor(name: string) {
    super(BLACK);
  }
}
