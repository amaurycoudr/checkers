import Coordinates from '../Position/Coordinate/Coordinate';
import { MoveNumber } from './type';
export declare const forBoard: (fn: (p: Coordinates, x: number, y: number) => void) => void;
export declare const forMove: (fn: (p: Coordinates, x: MoveNumber, y: MoveNumber) => void) => void;
