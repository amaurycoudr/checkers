import Position from "../Position/Position";

class TravelPlay {
  from: Position;
  to: Position;

  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }

  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}}`;
  }
}
export default TravelPlay;
