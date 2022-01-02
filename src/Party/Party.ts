import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import PlaysPossible from '../PlaysPossible/PlaysPossible';
import Coordinate from '../Position/Coordinate/Coordinate';

import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { BLACK, Color, WHITE } from '../utils/type';

export type PartyOptions = {
  firstPlayer: Color;
  boardSize: number;
  shouldCatchPiecesMaximum: boolean;
};

export const defaultOptions: PartyOptions = {
  firstPlayer: WHITE,
  boardSize: 10,
  shouldCatchPiecesMaximum: true,
};
class Party {
  private currentBoard: Board;

  private playerTurn: Color;

  private playsPossible: PlaysPossible;

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.currentBoard = new Board(initBoard, completeOptions.boardSize);
    this.playerTurn = completeOptions.firstPlayer;
    this.playsPossible = new PlaysPossible(
      this.getCurrentBoard(),
      this.playerTurn,
      completeOptions.shouldCatchPiecesMaximum,
    );
  }

  getCurrentBoard(): Board {
    return this.currentBoard;
  }

  getCurrentPlayer(): Color {
    return this.playerTurn;
  }

  getCurrentPlays(): TravelPlay[] {
    return this.playsPossible.getPlayerPlays();
  }

  private setPlaysPossible(to?: Coordinate) {
    this.playsPossible = new PlaysPossible(
      this.currentBoard,
      this.playerTurn,
      this.playsPossible.shouldCatchPiecesMaximum,
      to,
    );
  }

  playTurn(play: TravelPlay) {
    const realPlay = this.findPlayInPossible(play);

    if (!realPlay) {
      throw new Error(ERROR_PLAY_NOT_POSSIBLE);
    }

    this.updateCurrentBoard(realPlay);

    if (!this.canCurrentPlayerPlayAgain(realPlay)) {
      this.updateCurrentPlayer();
      this.setPlaysPossible();
    } else {
      this.setPlaysPossible(realPlay.to);
    }
  }

  private findPlayInPossible(play: TravelPlay) {
    return this.getCurrentPlays().find((playPossible) =>
      playPossible.equals(play),
    );
  }

  private updateCurrentBoard(play: TravelPlay) {
    this.currentBoard = this.getCurrentBoard().getNewBoardFromPlay(play);
  }

  private canCurrentPlayerPlayAgain(play: TravelPlay) {
    const isEatenPlay = play instanceof EatenPlay;
    const canEatFromNewPosition = this.getPieceSecondPlays(play.to).length > 0;

    return isEatenPlay && canEatFromNewPosition;
  }

  private getPieceSecondPlays(position: Coordinate) {
    return this.getCurrentBoard().getPieceSecondEatenPlays(
      this.getCurrentBoard().getBox(position) as Piece,
      position,
    );
  }

  private updateCurrentPlayer() {
    const isBlackTurn = this.playerTurn === BLACK;

    this.playerTurn = isBlackTurn ? WHITE : BLACK;
  }
}
export default Party;
