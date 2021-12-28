import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { MoveStr } from "../utils/type";

class EatenPlay extends TravelPlay {
  eaten: Position;
  constructor(from: Position, to: Position, eaten: Position) {
    super(from, to);
    this.eaten = eaten;
  }
  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}, eaten: ${this.eaten.toStr()}}`;
  }

  static eatenPlayFromMove(from: Position, to: MoveStr, eaten: MoveStr) {
    return new EatenPlay(
      from,
      from.getArrivalPosition(to),
      from.getArrivalPosition(eaten)
    );
  }
}
export default EatenPlay;
