import { Player } from ".";

abstract class Piece {
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }
  /**@todo add real return type */
  abstract getEatenMoves(): [];
  /**@todo add real return type */
  abstract getTravelMoves(): [];
}
export default Piece;
