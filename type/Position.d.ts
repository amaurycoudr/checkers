import { Coordinates, MoveStr } from "./utils/type";
declare class Position {
    private x;
    private y;
    constructor(x: number, y: number);
    isInBoard(): boolean;
    private isCoordinateInBoard;
    toStr(): string;
    equals(position: Position): boolean;
    getArrivalPosition(move: Position): Position;
    getX(): number;
    getY(): number;
    static getPositionFromCoordinate(coordinates: Coordinates): Position;
    getCoordinate(): Coordinates;
    static getPositionFromMove(moveDescription: MoveStr): Position;
    private static getXorYFromMoveCoordinate;
    static LEFT_TOP: Position;
    static LEFT_BOTTOM: Position;
    static RIGHT_TOP: Position;
    static RIGHT_BOTTOM: Position;
    static LEFT_TOP_2: Position;
    static LEFT_BOTTOM_2: Position;
    static RIGHT_TOP_2: Position;
    static RIGHT_BOTTOM_2: Position;
}
export default Position;
