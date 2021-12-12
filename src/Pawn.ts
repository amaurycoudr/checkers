import Piece from "./Piece";
import Player from "./Player";

class Pawn extends Piece {
  constructor(player: Player) {
    super(player);
  }

  getEatenPlay(): [] {
    return [];
  }

  getTravelPlay(): [] {
    return [];
  }
}
export default Pawn;
