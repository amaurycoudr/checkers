import { BoardState } from "./BoardState";
import Box from "./Box";
import Position from "./Position";
import { MoveStr } from "./utils/type";
type PieceMove = MoveStr[];
type PieceSituation = { [key in PieceMove[number]]?: null | Box };
class Board {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = initBoard;
  }

  getBox(position: Position) {
    return this.board[position.getY()][position.getX()];
  }
}
export default Board;
