import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import PlaysPossible from '../PlaysPossible/PlaysPossible';
import Coordinates from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { BLACK, Color, WHITE } from '../utils/type';

export type PartyOptions = {
  firstPlayer: Color;
  shouldCatchMaximumPieces: boolean;
};
export const defaultOptions: PartyOptions = {
  firstPlayer: WHITE,
  shouldCatchMaximumPieces: true,
};
class Party {
  private currentBoard: Board;

  private playerTurn: Color;

  private playsPossible: TravelPlay[] = [];

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.currentBoard = new Board(initBoard);
    this.playerTurn = completeOptions.firstPlayer;
    this.setPlaysPossible();
  }

  getCurrentBoard(): Board {
    return this.currentBoard;
  }

  getCurrentPlayer(): Color {
    return this.playerTurn;
  }

  getCurrentPlays(): TravelPlay[] {
    return this.playsPossible;
  }

  private setPlaysPossible(plays?: TravelPlay[]) {
    if (plays) {
      this.playsPossible = plays;
    } else {
      this.playsPossible = new PlaysPossible(
        this.getCurrentBoard(),
        this.playerTurn,
      ).getPlayerPlays();
    }
  }

  playTurn(play: TravelPlay) {
    const realPlay = this.findPlayInPossible(play);

    if (!realPlay) {
      throw new Error(ERROR_PLAY_NOT_POSSIBLE);
    }

    this.makePlay(realPlay);

    if (!this.canCurrentPlayerPlayAgain(realPlay)) {
      this.updateCurrentPlayer();
      this.setPlaysPossible();
    } else {
      this.setPlaysPossible(this.getPieceSecondPlays(realPlay.to));
    }
  }

  private findPlayInPossible(play: TravelPlay) {
    return this.getCurrentPlays().find((playPossible) =>
      playPossible.equals(play),
    );
  }

  private makePlay(play: TravelPlay) {
    this.currentBoard = this.getCurrentBoard().getNewBoardFromPlay(play);
  }

  private canCurrentPlayerPlayAgain(play: TravelPlay) {
    const isEatenPlay = play instanceof EatenPlay;
    const canEatFromNewPosition = this.getPieceSecondPlays(play.to).length > 0;

    return isEatenPlay && canEatFromNewPosition;
  }

  private getPieceSecondPlays(position: Coordinates) {
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
