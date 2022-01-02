import map from 'lodash/map';
import { EMPTY_BOX_TYPE, PieceType } from '../utils/board';
import { Color, MoveStr } from '../utils/type';

type PieceSituationContent =
  | { type: typeof EMPTY_BOX_TYPE }
  | { type: PieceType; color: Color };
export type PieceSituationType = {
  [key in MoveStr]?: PieceSituationContent;
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
    const boxStr = (
      boxContent: PieceSituationContent | undefined,
      move: MoveStr,
    ) => {
      if (!boxContent) {
        return '';
      }
      if (boxContent.type === 'Box') {
        return ` (${move}) : ${boxContent?.type} `;
      }
      return ` (${move}) : ${boxContent.type} ${boxContent.color} `;
    };

    return `{${map(this.situation, boxStr)}}`;
  }

  isEmptyBox(move: MoveStr) {
    return this.get()[move] && this.get()[move]?.type === 'Box';
  }

  isOpponentPiece(move: MoveStr, color: Color) {
    const piece = this.get()[move];

    if (piece && piece.type !== EMPTY_BOX_TYPE && piece.color !== color) {
      return true;
    }
    return false;
  }
}
export default PieceSituation;
