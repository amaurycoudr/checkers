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
  private playsPossible: PlaysPossible;

  private winner: Color | undefined = undefined;

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.playsPossible = new PlaysPossible(
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

  private setPlaysPossible(board: Board, to?: Coordinate) {
    const shouldUpdatePlayer = !to;

    const player = shouldUpdatePlayer
      ? this.getOtherPlayer()
      : this.playsPossible.getPlayerTurn();

    this.playsPossible = new PlaysPossible(
      board,
      player,
      this.playsPossible.shouldCatchPiecesMaximum,
      to,
    );
  }

  private getOtherPlayer() {
    return this.playsPossible.getPlayerTurn() === BLACK ? WHITE : BLACK;
  }

  private hasCurrentPlayerLost() {
    return this.getCurrentBoard().getPlayerPieces(this.getOtherPlayer());
  }

  playTurn(play: TravelPlay) {
    const { realPlay, playFinish } =
      this.playsPossible.findPlayInPossible(play);

    const newBoard = this.getNewBoard(realPlay);

    if (playFinish) {
      this.setPlaysPossible(newBoard);
    } else {
      this.setPlaysPossible(newBoard, realPlay.to);
    }

    if (this.hasCurrentPlayerLost()) {
      this.winner = this.getOtherPlayer();
    }
  }

  private getNewBoard(play: TravelPlay) {
    return this.getCurrentBoard().getNewBoardFromPlay(play);
  }
}
export default Party;
