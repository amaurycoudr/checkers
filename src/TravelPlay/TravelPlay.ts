import { Utils } from "../genericInterface";
import Position from "../Position/Position";
import { PlayJSON } from "../utils/type";

class TravelPlay implements Utils {
  from: Position;
  to: Position;

  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }

  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}}`;
  }

  equals(o: TravelPlay): boolean {
    return o.from.equals(this.from) && o.to.equals(this.to);
  }

  getJSON(): PlayJSON {
    return { from: this.from.getJSON(), to: this.to.getJSON() };
  }
}
export default TravelPlay;
