import { Position } from "..";
import { MoveStr } from "../utils/type";
import EatenPlay from "./EatenPlay";

export const eatenPlay = (p: Position, to: MoveStr, eaten: MoveStr) =>
  EatenPlay.eatenPlayFromMove(p, to, eaten);
