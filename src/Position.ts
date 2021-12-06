import { INDEX_MAX, INDEX_MIN } from "./utils/board";

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
