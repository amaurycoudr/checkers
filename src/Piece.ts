import Box from "./Box";
import Player from "./Player";

abstract class Piece extends Box {
  player: Player;

  constructor(player: Player) {
    super();
    this.player = player;
  }
  /**@todo add real return type */
  abstract getEatenMoves(): [];
  /**@todo add real return type */
  abstract getTravelMoves(): [];
}
export default Piece;
