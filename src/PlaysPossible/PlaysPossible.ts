import Board from '../Board/Board';
import EatenPlay from '../EatenPlay/EatenPlay';
import Piece from '../Piece/Piece';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { Color } from '../utils/type';

class PlaysPossible {
  board: Board;

  playsLength = 1;

  playerTurn: Color;

  shouldCatchPiecesMaximum: boolean;

  secondPlayTo?: Coordinate;

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

  private getSecondPlays() {
    const unfilteredPlays = this.secondPlayTo
      ? this.board.getPieceSecondEatenPlays(
          this.board.getBox(this.secondPlayTo) as Piece,
          this.secondPlayTo,
        )
      : [];

    return this.handleMustEatMaximumOfPieces(unfilteredPlays);
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
}
export default PlaysPossible;
