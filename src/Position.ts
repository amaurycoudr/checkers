import { INDEX_MAX, INDEX_MIN } from "./utils/board";
import {
  Coordinates,
  coordinatesX,
  coordinatesY,
  CoordinateX,
  CoordinateY,
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
    return n <= INDEX_MAX && n > INDEX_MIN;
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

  public getX(): number {
    return this.x;
  }
  public getY(): number {
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
    return `${x}${y}`;
  }

  static LEFT_TOP = new Position(-1, -1);
  static LEFT_BOTTOM = new Position(-1, 1);
  static RIGHT_TOP = new Position(1, -1);
  static RIGHT_BOTTOM = new Position(1, 1);

  static LEFT_TOP_2 = new Position(-2, -2);
  static LEFT_BOTTOM_2 = new Position(-2, 2);
  static RIGHT_TOP_2 = new Position(2, -2);
  static RIGHT_BOTTOM_2 = new Position(2, 2);
}
export default Position;
