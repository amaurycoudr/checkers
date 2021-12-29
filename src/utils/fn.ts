
import Coordinates from "../Position/Coordinate/Coordinate";
import { INDEX_MAX, INDEX_MIN } from "./board";
import { moveCoordinate, MoveNumber } from "./type";

export const forBoard = (
  fn: (p: Coordinates, x: number, y: number) => void
) => {
  for (let y = INDEX_MIN; y <= INDEX_MAX; y++) {
    for (let x = INDEX_MIN; x <= INDEX_MAX; x++) {
      fn(new Coordinates(x, y), x, y);
    }
  }
};
export const forMove = (
  fn: (p: Coordinates, x: MoveNumber, y: MoveNumber) => void
) => {
  moveCoordinate.forEach((x) => {
    moveCoordinate.forEach((y) => {
      fn(new Coordinates(x, y), x, y);
    });
  });
};
