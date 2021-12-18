import { BoardState } from "./BoardState";
import Piece from "./Piece";
import Player from "./Player";
import Position from "./Position";
import { INDEX_MAX, INDEX_MIN } from "./utils/board";
import { ERROR_NOT_PIECE, ERROR_OUT_OF_BOUND } from "./utils/error";
import { forBoard } from "./utils/fn";
import {
  BoardJSON,
  Coordinates,
  PieceJSON,
  PieceMove,
  PieceSituation,
} from "./utils/type";
export type PlayerPieces = { [key in Coordinates]?: Piece };
class Board {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = initBoard;
  }

  getBox(position: Position) {
    if (!position.isInBoard()) {
      throw new Error(ERROR_OUT_OF_BOUND);
    }
    return this.board[position.getY()][position.getX()];
  }

  getJSON(): BoardJSON {
    const JSON: BoardJSON = {};
    for (let y = INDEX_MIN; y <= INDEX_MAX; y++) {
      for (let x = INDEX_MIN; x <= INDEX_MAX; x++) {
        const position = new Position(x, y);
        const coordinate = position.getCoordinate();
        const json = this.getPositionJson(position);
        if (json) {
          JSON[coordinate] = json;
        }
      }
    }

    return JSON;
  }

  private getPositionJson(position: Position): PieceJSON | undefined {
    try {
      return this.getPiece(position).getJSON();
    } catch (error) {
      return undefined;
    }
  }

  private getPiece(position: Position): Piece {
    const box = this.getBox(position);
    if (box instanceof Piece) {
      return box;
    }
    throw new Error(ERROR_NOT_PIECE);
  }

  getAroundSituation(position: Position, move: PieceMove): PieceSituation {
    return move.reduce((prev, curr): PieceSituation => {
      const arrivalPosition = position.getArrivalPosition(
        Position.getPositionFromMove(curr)
      );

      const box = arrivalPosition.isInBoard() && this.getBox(arrivalPosition);

      if (box) {
        return { ...prev, [curr]: box };
      }
      return prev;
    }, {});
  }

  getPieceEatenPlays(piece: Piece, position: Position) {
    return piece.getEatenPlays(
      this.getAroundSituation(position, piece.eatenMoves),
      position
    );
  }
  getPlayerPieces(player: Player): PlayerPieces {
    const result: PlayerPieces = {};
    forBoard((position) => {
      try {
        const piece = this.getPiece(position);
        if (!piece.isOpponent(player)) {
          result[position.getCoordinate()] = piece;
        }
      } catch {}
    });
    return result;
  }
}
export default Board;
