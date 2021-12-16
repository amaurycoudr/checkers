import Position from "../Position";
import { MoveNumber } from "./type";
export declare const forBoard: (fn: (p: Position, x: number, y: number) => void) => void;
export declare const forMove: (fn: (p: Position, x: MoveNumber, y: MoveNumber) => void) => void;
