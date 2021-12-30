import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import Coordinates from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { BLACK, Color, WHITE } from '../utils/type';

type PartyOptions = { firstPlayer: Color };
const defaultOptions: PartyOptions = { firstPlayer: WHITE };
class Party {
  private turns: Board[];

  private playerTurn: Color;

  private playsPossible: TravelPlay[][];

  constructor(initBoard: BoardState, options: PartyOptions = defaultOptions) {
    this.turns = [new Board(initBoard)];
    this.playerTurn = options.firstPlayer;
    this.playsPossible = [this.turns[0].getPlayerPlays(this.playerTurn)];
  }

  getCurrentBoard(): Board {
    return this.turns[this.turns.length - 1];
  }

  getCurrentPlayer(): Color {
    return this.playerTurn;
  }

  getCurrentPlays(): TravelPlay[] {
    return this.playsPossible[this.playsPossible.length - 1];
  }

  private setPlaysPossible(plays?: TravelPlay[]) {
    if (plays) {
      this.playsPossible.push(plays);
    } else {
      this.playsPossible.push(
        this.getCurrentBoard().getPlayerPlays(this.playerTurn),
      );
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
    this.turns.push(this.getCurrentBoard().getNewBoardFromPlay(play));
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
