export const BLACK = "black";
export const WHITE = "white";
export type Color = typeof WHITE | typeof BLACK;

export const TOP = "top";
export const BOTTOM = "bottom";
export type Side = typeof TOP | typeof BOTTOM;

export type LengthType<T> = [T, T, T, T, T, T, T, T, T, T];

export const coordinatesY = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type CoordinateY = typeof coordinatesY[number];

export const coordinatesX = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
] as const;
export type CoordinateX = typeof coordinatesX[number];

export type Coordinates = `${CoordinateX}${CoordinateY}`;
