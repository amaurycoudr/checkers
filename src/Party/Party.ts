import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import PartySituation from '../PlaysPossible/PartySituation';
import TravelPlay from '../TravelPlay/TravelPlay';
import { Color, WHITE } from '../utils/type';

export type PartyOptions = {
  /** **default: white**  */
  firstPlayer: Color;
  /** **default: 10**  */
  boardSize: 10 | 8;
  /** decides if player must capture the maximum possible number of pieces \
   *  **default: true**  */
  shouldCatchPiecesMaximum: boolean;
  /** **default: true**  */
  shouldPromoteWhenMoveEnding: boolean;
};

export const defaultOptions: PartyOptions = {
  firstPlayer: WHITE,
  boardSize: 10,
  shouldCatchPiecesMaximum: true,
  shouldPromoteWhenMoveEnding: true,
};
class Party {
  private playsPossible: PartySituation;

  private winner: Color | undefined = undefined;

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.playsPossible = new PartySituation(
      new Board(initBoard, completeOptions.boardSize),
      completeOptions.firstPlayer,
      completeOptions.shouldCatchPiecesMaximum,
    );
  }

  getCurrentBoard(): Board {
    return this.playsPossible.getBoard();
  }

  getCurrentPlayer(): Color {
    return this.playsPossible.getPlayerTurn();
  }

  getCurrentPlays(): TravelPlay[] {
    return this.playsPossible.getPlayerPlays();
  }

  getWinner() {
    return this.winner;
  }

  playTurn(play: TravelPlay) {
    const { newSituation, hasOtherPlayerLost } =
      this.playsPossible.makePlay(play);

    if (hasOtherPlayerLost) {
      this.winner = this.getCurrentPlayer();
    }
    this.playsPossible = newSituation;
  }
}
export default Party;
