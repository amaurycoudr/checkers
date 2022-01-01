import { Utils } from '../genericInterface';
import { MoveCoordinate, MoveStr } from '../utils/type';

class Position implements Utils {
  protected x: number;

  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isInBoard(sizeBoard: number) {
    return (
      Position.isCoordinateInBoard(this.x, sizeBoard) &&
      Position.isCoordinateInBoard(this.y, sizeBoard)
    );
  }

  static isCoordinateInBoard(n: number, sizeBoard: number) {
    return n <= sizeBoard && n >= 0;
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
      moveDescription.slice(0, 2) as MoveCoordinate,
    );
    const y = this.getXorYFromMoveCoordinate(
      moveDescription.slice(3, 5) as MoveCoordinate,
    );

    return new Position(x, y);
  }

  private static getXorYFromMoveCoordinate(moveCoordinate: MoveCoordinate) {
    const value = parseInt(moveCoordinate[1], 10);
    return moveCoordinate[0] === '+' ? value : -value;
  }
}
export default Position;
