export declare const BLACK = "black";
export declare const WHITE = "white";
export declare type Color = typeof WHITE | typeof BLACK;
export declare type LengthType<T> = [T, T, T, T, T, T, T, T, T, T];
export declare const coordinatesY: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export declare type CoordinateY = typeof coordinatesY[number];
export declare const coordinatesX: readonly ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export declare type CoordinateX = typeof coordinatesX[number];
export declare type CoordinatesStr = `${CoordinateX}${CoordinateY}`;
export declare const moveCoordinate: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9];
export declare type MoveNumber = typeof moveCoordinate[number];
export declare type MoveDirection = '-' | '+';
export declare type MoveCoordinate = `${MoveDirection}${MoveNumber}`;
export declare type MoveStr = `${MoveCoordinate}.${MoveCoordinate}`;
export declare type PieceJSON = {
    type: string;
    player: Color;
};
export declare type PieceMoves = MoveStr[];
export declare type BoardJSON = {
    [key in CoordinatesStr]?: PieceJSON;
};
export declare type LineArray = LengthType<PieceJSON | undefined>;
export declare type BoardArray = LengthType<LineArray>;
export declare type PlayJSON = {
    from: CoordinatesStr;
    to: CoordinatesStr;
};
