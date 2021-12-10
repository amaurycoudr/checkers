import { BoardState } from "./BoardState";
import Position from "./Position";

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
