import Piece from "./Piece";
import { BOX_NOT_PIECE } from "./utils/error";

abstract class Box {
  isNotEmpty(): boolean {
    return this instanceof Piece;
  }
  getPiece(): Piece {
    if (this instanceof Piece) {
      return this;
    } else {
      throw new Error(BOX_NOT_PIECE);
    }
  }
}
export default Box;
