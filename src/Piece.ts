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

  isOpponent(otherPlayer: Player) {
    return !otherPlayer.equals(this.player);
  }

  /**@todo add real return type */
  abstract getEatenPlay(): [];
  /**@todo add real return type */
  abstract getTravelPlay(): [];
}
