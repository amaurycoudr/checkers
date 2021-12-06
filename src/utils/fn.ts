import Position from "../Position";
import { INDEX_MAX, INDEX_MIN } from "./board";

export const forBoard = (fn: (p: Position, x: number, y: number) => void) => {
  for (let y = INDEX_MIN; y <= INDEX_MAX; y++) {
    for (let x = INDEX_MIN; x <= INDEX_MAX; x++) {
      fn(new Position(x, y), x, y);
    }
  }
};
