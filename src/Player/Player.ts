import { Json, Utils } from "../genericInterface";
import { BLACK, Color, WHITE } from "../utils/type";

export type PlayerJSON = { color: Color; name: string };
class Player implements Utils, Json {
  private color: Color;
  private name: string;

  constructor(color: Color, name: string) {
    this.name = name;
    this.color = color;
  }

  public toStr() {
    return `${this.name} the ${this.color} player`;
  }

  public equals(player: Player) {
    return this.color === player.color;
  }

  public isTop() {
    return this.color === BLACK;
  }

  getJSON(): PlayerJSON {
    return { color: this.color, name: this.name };
  }

  public getColor() {
    return this.color;
  }
}
export default Player;
class PlayerWhite extends Player {
  constructor(name: string) {
    super(WHITE, name);
  }
}
export { PlayerWhite };
export { PlayerBlack };

class PlayerBlack extends Player {
  constructor(name: string) {
    super(BLACK, name);
  }
}
