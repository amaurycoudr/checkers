import { map } from 'lodash';
import { BoardContent } from '../Board/BoardContent';

import EmptyBox from '../EmptyBox/EmptyBox';
import { Color, MoveStr } from '../utils/type';

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
      (BoxContent, move) => ` (${move}) : ${BoxContent?.toStr()} `,
    )}}`;
  }

  isEmptyBox(move: MoveStr) {
    return this.get()[move] && this.get()[move] instanceof EmptyBox;
  }

  isOpponentPiece(move: MoveStr, color: Color) {
    const piece = this.get()[move];
    if (piece && !(piece instanceof EmptyBox) && piece.isOpponent(color)) {
      return true;
    }
    return false;
  }
}
export default PieceSituation;
