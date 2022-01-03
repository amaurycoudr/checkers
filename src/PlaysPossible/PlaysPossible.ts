import Board from '../Board/Board';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { Color } from '../utils/type';

class PlaysPossible {
  private board: Board;

  private playerTurn: Color;

  shouldCatchPiecesMaximum: boolean;

  private secondPlayTo?: Coordinate;

  constructor(
    board: Board,
    playerTurn: Color,
    shouldCatchPiecesMaximum: boolean,
    secondPlayTo: Coordinate | undefined = undefined,
  ) {
    this.board = board;
    this.playerTurn = playerTurn;
    this.shouldCatchPiecesMaximum = shouldCatchPiecesMaximum;
    this.secondPlayTo = secondPlayTo;
  }

  getPlayerPlays(): TravelPlay[] {
    if (this.secondPlayTo) {
      const secondPlays = this.getSecondPlays();
      return secondPlays;
    }

    const eatenPlays = this.getEatenPlays();
    if (eatenPlays.length > 0) {
      return eatenPlays;
    }

    const travelMoves: TravelPlay[] = this.board.getPlayerTravelPlays(
      this.playerTurn,
    );
    return travelMoves;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }

  getBoard() {
    return this.board;
  }

  private getSecondPlays() {
    const unfilteredPlays =
      this.secondPlayTo &&
      this.board.getPieceEatenPlays(
        this.board.getBox(this.secondPlayTo) as Piece,
        this.secondPlayTo,
      );

    return this.handleMustEatMaximumOfPieces(unfilteredPlays || []);
  }

  private getEatenPlays() {
    const unfilteredPlays = this.board.getPlayerEatenPlays(this.playerTurn);

    return this.handleMustEatMaximumOfPieces(unfilteredPlays);
  }

  private handleMustEatMaximumOfPieces(plays: EatenPlay[]) {
    return this.shouldCatchPiecesMaximum
      ? this.filterByEatenPieceNumber(plays)
      : plays;
  }

  private filterByEatenPieceNumber(unfilteredPlays: EatenPlay[]) {
    if (unfilteredPlays.length === 0) {
      return unfilteredPlays;
    }
    const numberOfPieceEatenMax = this.getEatenPieceNumberMax(unfilteredPlays);

    return unfilteredPlays.filter(
      (play) => this.getNumberOfEatenPiece(play) === numberOfPieceEatenMax,
    );
  }

  private getEatenPieceNumberMax(plays: TravelPlay[]) {
    return Math.max(...plays.map((play) => this.getNumberOfEatenPiece(play)));
  }

  getNumberOfEatenPiece(play: TravelPlay): number {
    const newBoard = this.board.getNewBoardFromPlay(play);

    if (!(play instanceof EatenPlay)) {
      return 1;
    }
    const newPlaysPossible = new PlaysPossible(
      newBoard,
      this.playerTurn,
      this.shouldCatchPiecesMaximum,
      play.to,
    );
    const plays = newPlaysPossible.getPlayerPlays();

    return plays.length > 0
      ? 1 +
          Math.max(
            ...plays.map((newPlay) =>
              newPlaysPossible.getNumberOfEatenPiece(newPlay),
            ),
          )
      : 1;
  }

  findPlayInPossible(play: TravelPlay) {
    const realPlay = this.getPlayerPlays().find((playPossible) =>
      playPossible.equals(play),
    );
    if (!realPlay) {
      throw new Error(ERROR_PLAY_NOT_POSSIBLE);
    }
    return { realPlay, playFinish: this.getNumberOfEatenPiece(realPlay) === 1 };
  }
}
export default PlaysPossible;
