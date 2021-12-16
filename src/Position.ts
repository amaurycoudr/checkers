import { INDEX_MAX, INDEX_MIN } from "./utils/board";
import { ERROR_COORDINATE_OUT } from "./utils/error";
import {
  Coordinates,
  coordinatesX,
  coordinatesY,
  CoordinateX,
  CoordinateY,
  MoveCoordinate,
  MoveStr,
} from "./utils/type";
class Position {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isInBoard() {
    return this.isCoordinateInBoard(this.x) && this.isCoordinateInBoard(this.y);
  }
  private isCoordinateInBoard(n: number) {
    return n <= INDEX_MAX && n >= INDEX_MIN;
  }

  toStr() {
    return `(${this.x},${this.y})`;
  }
  equals(position: Position) {
    return this.x === position.x && this.y === position.y;
  }
  getArrivalPosition(move: Position): Position {
    return new Position(this.x + move.x, this.y + move.y);
  }

  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }

  static getPositionFromCoordinate(coordinates: Coordinates): Position {
    const yCoordinate = parseInt(coordinates[1], 10) as CoordinateY;
    const y = coordinatesY.indexOf(yCoordinate);
    const xCoordinate = coordinates[0] as CoordinateX;
    const x = coordinatesX.indexOf(xCoordinate);
    return new Position(x, y);
  }

  getCoordinate(): Coordinates {
    const x = coordinatesX[this.x];
    const y = coordinatesY[this.y];
    if (!x || !y) {
      throw new Error(ERROR_COORDINATE_OUT);
    }
    return `${x}${y}`;
  }

  static getPositionFromMove(moveDescription: MoveStr): Position {
    const x = this.getXorYFromMoveCoordinate(
      moveDescription.slice(0, 2) as MoveCoordinate
    );
    const y = this.getXorYFromMoveCoordinate(
      moveDescription.slice(3, 5) as MoveCoordinate
    );

    return new Position(x, y);
  }
  private static getXorYFromMoveCoordinate(moveCoordinate: MoveCoordinate) {
    const value = parseInt(moveCoordinate[1], 10);
    return moveCoordinate[0] === "+" ? value : -value;
  }
}
export default Position;
