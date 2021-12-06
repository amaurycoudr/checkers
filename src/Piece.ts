import Box from "./Box";
import Player from "./Player";

export default abstract class Piece extends Box {
  player: Player;

  constructor(player: Player) {
    super();
    this.player = player;
  }
  isNotEmpty(): boolean {
    return true;
  }
  getPiece(): Piece {
    return this;
  }
  /**@todo add real return type */
  abstract getEatenMoves(): [];
  /**@todo add real return type */
  abstract getTravelMoves(): [];
}
