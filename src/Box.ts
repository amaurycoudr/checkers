import Piece from "./Piece";
import { BOX_NOT_PIECE } from "./utils/error";

class Box {
  isNotEmpty(): boolean {
    return false;
  }
  getPiece(): Piece {
    throw new Error(BOX_NOT_PIECE);
  }
}
export default Box;
