import { Utils } from "../genericInterface";
import { INDEX_MAX, INDEX_MIN } from "../utils/board";
import { ERROR_COORDINATE_OUT } from "../utils/error";
import {
  CoordinatesStr,
  coordinatesX,
  coordinatesY,
  CoordinateX,
  CoordinateY,
  MoveCoordinate,
  MoveStr,
} from "../utils/type";
class Position implements Utils {
  protected x: number;
  protected y: number;

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



  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }



  static fromMove(moveDescription: MoveStr): Position {
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
