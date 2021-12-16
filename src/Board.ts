import { BoardState } from "./BoardState";
import Box from "./Box";
import Piece from "./Piece";
import Position from "./Position";
import { INDEX_MAX, INDEX_MIN } from "./utils/board";
import { ERROR_NOT_PIECE } from "./utils/error";
import { BoardJSON, PieceJSON, PieceMove, PieceSituation } from "./utils/type";

class Board {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = initBoard;
  }

  getBox(position: Position) {
    return this.board[position.getY()][position.getX()];
  }

  getJSON(): BoardJSON {
    let JSON: BoardJSON = {};
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
      return this.getPiece(this.getBox(position)).getJSON();
    } catch (error) {
      return undefined;
    }
  }
  private getPiece(box: Box): Piece {
    if (box instanceof Piece) {
      return box;
    } else {
      throw new Error(ERROR_NOT_PIECE);
    }
  }
  getAroundSituation(position: Position, move: PieceMove): PieceSituation {
    return move.reduce((prev, curr): PieceSituation => {
      const box = this.getBox(
        position.getArrivalPosition(Position.getPositionFromMove(curr))
      );
      if (box) {
        return { ...prev, [curr]: box };
      } else {
        return prev;
      }
    }, {});
  }
}
export default Board;
