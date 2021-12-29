import { Utils } from "../genericInterface";
import Coordinate from "../Position/Coordinate/Coordinate";

import Position from "../Position/Position";
import { INDEX_MAX, INDEX_MIN } from "../utils/board";
import { MoveStr, PlayJSON } from "../utils/type";

class TravelPlay implements Utils {
  from: Coordinate;
  to: Coordinate;

  constructor(from: Coordinate, to: Coordinate) {
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
    return { from: this.from.toStr(), to: this.to.toStr() };
  }

  shouldTransformInQueen(): boolean {
    return this.to.getY() === INDEX_MAX || this.to.getY() === INDEX_MIN;
  }

  static fromJson(json: PlayJSON): TravelPlay {
    return new TravelPlay(
      Coordinate.create(json.from),
      Coordinate.create(json.to)
    );
  }
  static fromMove(from: Coordinate, to: MoveStr) {
    return new TravelPlay(from, from.getArrivalCoordinates(to));
  }
}
export default TravelPlay;
