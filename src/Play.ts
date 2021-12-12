import Position from "./Position";

class Play {
  private from: Position;
  private to: Position;

  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }

  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}}`;
  }
}
export default Play;
