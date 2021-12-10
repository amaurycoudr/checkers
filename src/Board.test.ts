import Board from "./Board";
import { EMPTY_BOARD } from "./BoardState";
import { forBoard } from "./utils/fn";

const emptyBoard = new Board(EMPTY_BOARD);

describe("test getBox()", () => {
  it("getBox(new Position(x, y)) should be equal boardState[y][x]", () => {
    forBoard((position, x, y) => {
      expect(emptyBoard.getBox(position)).toBe(EMPTY_BOARD[y][x]);
    });
  });
});
