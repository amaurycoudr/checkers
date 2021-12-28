import Position from "../Position/Position";
import { INDEX_MAX, INDEX_MIN } from "./board";
import { moveCoordinate, MoveNumber } from "./type";

export const forBoard = (fn: (p: Position, x: number, y: number) => void) => {
  for (let y = INDEX_MIN; y <= INDEX_MAX; y++) {
    for (let x = INDEX_MIN; x <= INDEX_MAX; x++) {
      fn(new Position(x, y), x, y);
    }
  }
};
export const forMove = (
  fn: (p: Position, x: MoveNumber, y: MoveNumber) => void
) => {
  moveCoordinate.forEach((x) => {
    moveCoordinate.forEach((y) => {
      fn(new Position(x, y), x, y);
    });
  });
};
