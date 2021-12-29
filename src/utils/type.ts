export const BLACK = 'black';
export const WHITE = 'white';
export type Color = typeof WHITE | typeof BLACK;

export type LengthType<T> = [T, T, T, T, T, T, T, T, T, T];

export const coordinatesY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type CoordinateY = typeof coordinatesY[number];

export const coordinatesX = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
] as const;
export type CoordinateX = typeof coordinatesX[number];

export type CoordinatesStr = `${CoordinateX}${CoordinateY}`;

export const moveCoordinate = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type MoveNumber = typeof moveCoordinate[number];

export type MoveDirection = '-' | '+';

export type MoveCoordinate = `${MoveDirection}${MoveNumber}`;

export type MoveStr = `${MoveCoordinate}.${MoveCoordinate}`;

export type PieceJSON = {
  type: string;
  player: Color;
};
export type PieceMoves = MoveStr[];

export type BoardJSON = { [key in CoordinatesStr]?: PieceJSON };
export type LineArray = LengthType<PieceJSON | undefined>;
export type BoardArray = LengthType<LineArray>;

export type PlayJSON = { from: CoordinatesStr; to: CoordinatesStr };
