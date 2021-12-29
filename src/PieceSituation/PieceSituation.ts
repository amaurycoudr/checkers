import { map } from 'lodash';
import { ContentType } from '../utils/board';
import { Color, MoveStr } from '../utils/type';

export type PieceSituationType = {
  [key in MoveStr]?: { type: ContentType; color?: Color };
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
      (BoxContent, move) =>
        ` (${move}) : ${BoxContent?.type}${
          BoxContent?.color ? ` ${BoxContent?.color}` : ''
        } `,
    )}}`;
  }

  isEmptyBox(move: MoveStr) {
    return this.get()[move] && this.get()[move]?.type === 'Box';
  }

  isOpponentPiece(move: MoveStr, color: Color) {
    const piece = this.get()[move];

    if (piece && piece.color && piece.color !== color) {
      return true;
    }
    return false;
  }
}
export default PieceSituation;
