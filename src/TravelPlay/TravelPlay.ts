import { Utils } from "../genericInterface";
import Position from "../Position/Position";
import { MoveStr, PlayJSON } from "../utils/type";

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

  static fromJson(json: PlayJSON): TravelPlay {
    return new TravelPlay(
      Position.getPositionFromCoordinate(json.from),
      Position.getPositionFromCoordinate(json.to)
    );
  }
  static fromMove(from: Position, to: MoveStr) {
    return new TravelPlay(from, from.getArrivalPosition(to));
  }
}
export default TravelPlay;
