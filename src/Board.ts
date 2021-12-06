import Box from "./Box";
import Position from "./Position";
import { LengthType } from "./utils/type";
export type BoardState = LengthType<LengthType<Box>>;

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
export const EMPTY_BOARD: BoardState = [
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
  [
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
    new Box(),
  ],
];
