import { isEqual, map } from "lodash";
import EmptyBox from "../EmptyBox/EmptyBox";
import { Utils } from "../genericInterface";
import Piece from "../Piece/Piece";
import { BoardContent, Color, MoveStr } from "../utils/type";

export type PieceSituationType = {
  [key in MoveStr]?: BoardContent;
};
class PieceSituation {
  private situation: PieceSituationType;
  constructor(situation: PieceSituationType) {
    this.situation = situation;
  }
  get() {
    return this.situation;
  }
  toStr(): string {
    return `{${map(
      this.situation,
      (BoxContent, move) => ` (${move}) : ${BoxContent?.toStr()} `
    )}}`;
  }

  isEmptyBox(move: MoveStr) {
    return this.get()[move] && this.get()[move] instanceof EmptyBox;
  }
  isOpponentPiece(move: MoveStr, color: Color) {
    const piece = this.get()[move];
    if (piece instanceof Piece && piece.isOpponent(color)) {
      return true;
    } else {
      return false;
    }
  }
}
export default PieceSituation;
