import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";

class EatenPlay extends TravelPlay {
  eaten: Position;
  constructor(from: Position, to: Position, eaten: Position) {
    super(from, to);
    this.eaten = eaten;
  }
  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}, eaten: ${this.eaten.toStr()}}`;
  }
}
export default EatenPlay;
