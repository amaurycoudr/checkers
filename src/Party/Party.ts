import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import PlaysPossible from '../PlaysPossible/PlaysPossible';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { BLACK, Color, WHITE } from '../utils/type';

export type PartyOptions = {
  firstPlayer: Color;
  boardSize: 10 | 8;
  shouldCatchPiecesMaximum: boolean;
};

export const defaultOptions: PartyOptions = {
  firstPlayer: WHITE,
  boardSize: 10,
  shouldCatchPiecesMaximum: true,
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
    const otherPLayer =
      this.playsPossible.getPlayerTurn() === BLACK ? WHITE : BLACK;
    const player = shouldUpdatePlayer
      ? otherPLayer
      : this.playsPossible.getPlayerTurn();

    this.playsPossible = new PlaysPossible(
      this.currentBoard,
      player,
      this.playsPossible.shouldCatchPiecesMaximum,
      to,
    );
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
