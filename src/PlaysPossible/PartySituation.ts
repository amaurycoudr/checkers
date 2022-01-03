import { isEmpty } from 'lodash';
import Board from '../Board/Board';
import EatenPlay from '../EatenPlay/EatenPlay';
import Pawn from '../Piece/Pawn/Pawn';
import Piece from '../Piece/Piece';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { BLACK, Color, WHITE } from '../utils/type';

class PartySituation {
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
    const newPlaysPossible = new PartySituation(
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

  makePlay(play: TravelPlay): {
    newSituation: PartySituation;
    hasPawnMove: boolean;
    hasEaten: boolean;
    hasOtherPlayerLost: boolean;
  } {
    const { realPlay, playFinish } = this.findPlayInPossible(play);

    const newBoard = this.board.getNewBoardFromPlay(realPlay);

    const hasOtherPlayerLost = isEmpty(
      newBoard.getPlayerPieces(this.getOtherPlayer()),
    );

    const newSituation = new PartySituation(
      newBoard,
      playFinish && !hasOtherPlayerLost
        ? this.getOtherPlayer()
        : this.playerTurn,
      this.shouldCatchPiecesMaximum,
      playFinish ? undefined : play.to,
    );

    return {
      hasEaten: realPlay instanceof EatenPlay,
      hasPawnMove: this.board.getBox(realPlay.from) instanceof Pawn,
      hasOtherPlayerLost,
      newSituation,
    };
  }

  private findPlayInPossible(play: TravelPlay) {
    const realPlay = this.getPlayerPlays().find((playPossible) =>
      playPossible.equals(play),
    );
    if (!realPlay) {
      throw new Error(ERROR_PLAY_NOT_POSSIBLE);
    }
    return { realPlay, playFinish: this.getNumberOfEatenPiece(realPlay) === 1 };
  }

  private getOtherPlayer() {
    return this.getPlayerTurn() === BLACK ? WHITE : BLACK;
  }
}
export default PartySituation;
