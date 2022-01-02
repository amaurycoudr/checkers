import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import PlaysPossible from '../PlaysPossible/PlaysPossible';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { BLACK, Color, WHITE } from '../utils/type';

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
  private currentBoard: Board;

  private playsPossible: PlaysPossible;

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.currentBoard = new Board(initBoard, completeOptions.boardSize);
    this.playsPossible = new PlaysPossible(
      this.getCurrentBoard(),
      completeOptions.firstPlayer,
      completeOptions.shouldCatchPiecesMaximum,
    );
  }

  getCurrentBoard(): Board {
    return this.currentBoard;
  }

  getCurrentPlayer(): Color {
    return this.playsPossible.getPlayerTurn();
  }

  getCurrentPlays(): TravelPlay[] {
    return this.playsPossible.getPlayerPlays();
  }

  private setPlaysPossible(to?: Coordinate) {
    const shouldUpdatePlayer = !to;

    const player = shouldUpdatePlayer
      ? this.getOtherPlayer()
      : this.playsPossible.getPlayerTurn();

    this.playsPossible = new PlaysPossible(
      this.currentBoard,
      player,
      this.playsPossible.shouldCatchPiecesMaximum,
      to,
    );
  }

  private getOtherPlayer() {
    return this.playsPossible.getPlayerTurn() === BLACK ? WHITE : BLACK;
  }

  playTurn(play: TravelPlay) {
    const { realPlay, playFinish } =
      this.playsPossible.findPlayInPossible(play);

    this.updateCurrentBoard(realPlay);

    if (playFinish) {
      this.setPlaysPossible();
    } else {
      this.setPlaysPossible(realPlay.to);
    }
  }

  private updateCurrentBoard(play: TravelPlay) {
    this.currentBoard = this.getCurrentBoard().getNewBoardFromPlay(play);
  }
}
export default Party;
