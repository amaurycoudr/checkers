import Coordinates from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { MoveStr } from '../utils/type';

class EatenPlay extends TravelPlay {
  eaten: Coordinates;

  constructor(from: Coordinates, to: Coordinates, eaten: Coordinates) {
    super(from, to);
    this.eaten = eaten;
  }

  toStr() {
    return `{from: ${this.from.toStr()}, to: ${this.to.toStr()}, eaten: ${this.eaten.toStr()}}`;
  }

  static eatenPlayFromMove(from: Coordinates, to: MoveStr, eaten: MoveStr) {
    return new EatenPlay(from, from.getArrivalCoordinate(to), from.getArrivalCoordinate(eaten));
  }
}
export default EatenPlay;
