import { ERROR_COORDINATE_OUT } from '../../utils/error';
import {
  CoordinatesStr,
  coordinatesX,
  coordinatesY,
  CoordinateX,
  CoordinateY,
  MoveStr,
} from '../../utils/type';
import Position from '../Position';

class Coordinate extends Position {
  coordinates: CoordinatesStr;

  constructor(x: number, y: number) {
    super(x, y);
    this.coordinates = Coordinate.getCoordinate(x, y);
  }

  static getCoordinate(x: number, y: number): CoordinatesStr {
    const coordinateX = coordinatesX[x];
    const coordinateY = coordinatesY[y];
    if (!coordinateX || !coordinateY) {
      throw new Error(ERROR_COORDINATE_OUT);
    }
    return `${coordinateX}${coordinateY}`;
  }

  toStr(): CoordinatesStr {
    return this.coordinates;
  }

  get() {
    return this.coordinates;
  }

  static create(coordinates: CoordinatesStr) {
    const yCoordinate = parseInt(
      coordinates.slice(1, coordinates.length),
      10,
    ) as CoordinateY;
    const y = coordinatesY.indexOf(yCoordinate);
    const xCoordinate = coordinates[0] as CoordinateX;
    const x = coordinatesX.indexOf(xCoordinate);
    return new Coordinate(x, y);
  }

  getArrivalCoordinate(move: MoveStr) {
    return this.addMove(Position.fromMove(move));
  }

  getDiagonalCoordinate(n: number) {
    return new Coordinate(
      Math.abs(this.x + n) * Math.sign(this.x),
      Math.abs(this.y + n) * Math.sign(this.y),
    );
  }

  private addMove(move: Position) {
    return new Coordinate(this.x + move.getX(), this.y + move.getY());
  }
}
export const getCoordinate = (x: number, y: number): CoordinatesStr =>
  Coordinate.getCoordinate(x, y);

export default Coordinate;
