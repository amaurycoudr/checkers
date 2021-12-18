import Box from "../Box";

export const BLACK = "black";
export const WHITE = "white";
export type Color = typeof WHITE | typeof BLACK;

export const TOP = "top";
export const BOTTOM = "bottom";
export type Side = typeof TOP | typeof BOTTOM;

export type LengthType<T> = [T, T, T, T, T, T, T, T];

export const coordinatesY = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type CoordinateY = typeof coordinatesY[number];

export const coordinatesX = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
export type CoordinateX = typeof coordinatesX[number];

export type Coordinates = `${CoordinateX}${CoordinateY}`;

export const moveCoordinate = [1, 2, 3, 4, 5, 6, 7] as const;

export type MoveNumber = typeof moveCoordinate[number];

export type MoveDirection = "-" | "+";

export type MoveCoordinate = `${MoveDirection}${MoveNumber}`;

export type MoveStr = `${MoveCoordinate}.${MoveCoordinate}`;

export type PieceJSON = {
  type: string;
  player: Color;
};
export type PieceMove = MoveStr[];
export type PieceSituation = { [key in PieceMove[number]]?: Box };

export type BoardJSON = { [key in Coordinates]?: PieceJSON };
