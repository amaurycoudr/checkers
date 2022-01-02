import {
  methodTest,
  methodTestFordBoard,
  methodTestMap,
} from '../../../test/utils';
import { ERROR_COORDINATE_OUT } from '../../utils/error';
import {
  CoordinatesStr,
  coordinatesX,
  coordinatesY,
  MoveStr,
} from '../../utils/type';
import Coordinate, { getCoordinate } from './Coordinate';
import { A1, B2, B3, C3 } from './coordinates';

methodTestFordBoard(Coordinate.create, (coordinate, x, y) => {
  const coordinates: CoordinatesStr = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${coordinate.toStr()} for ${coordinates} `, () => {
    expect(Coordinate.create(coordinates)).toStrictEqual(coordinate);
  });
});
const coordinateExample = new Coordinate(5, 5);
methodTestFordBoard(coordinateExample.toStr, (coordinate, x, y) => {
  const coordinates: CoordinatesStr = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${coordinates} for ${coordinate.toStr()} `, () => {
    expect(coordinate.toStr()).toBe(coordinates);
  });
});

methodTest(Coordinate.create, () => {
  it('should throw en error if the position is out of bond', () => {
    expect(() => new Coordinate(-1, 0)).toThrow(ERROR_COORDINATE_OUT);
  });
});

type GetArrivalCoordinateData = {
  coordinate: Coordinate;
  move: MoveStr;
  expected: Coordinate;
};
const getArrivalCoordinateDescription = (data: GetArrivalCoordinateData) =>
  ` should return ${data.expected.toStr()} for COORDINATE:${data.coordinate.toStr()} MOVE: ${
    data.move
  }`;

const getArrivalCoordinateExpect = (data: GetArrivalCoordinateData) => {
  expect(data.coordinate.getArrivalCoordinate(data.move)).toStrictEqual(
    data.expected,
  );
};

methodTestMap<GetArrivalCoordinateData>(
  coordinateExample.getArrivalCoordinate,
  [
    { coordinate: A1, expected: B2, move: '+1.+1' },
    { coordinate: A1, expected: C3, move: '+2.+2' },
    { coordinate: B2, expected: A1, move: '-1.-1' },
    { coordinate: B3, expected: A1, move: '-1.-2' },
  ],
  getArrivalCoordinateDescription,
  getArrivalCoordinateExpect,
);

methodTestMap<GetArrivalCoordinateData>(
  getCoordinate,
  [
    { coordinate: A1, expected: B2, move: '+1.+1' },
    { coordinate: A1, expected: C3, move: '+2.+2' },
    { coordinate: B2, expected: A1, move: '-1.-1' },
    { coordinate: B3, expected: A1, move: '-1.-2' },
  ],
  getArrivalCoordinateDescription,
  getArrivalCoordinateExpect,
);

methodTest(getCoordinate, () => {
  it('should throw an error if out of bound', () => {
    expect(() => {
      A1.getArrivalCoordinate('-1.+1');
    }).toThrowError(ERROR_COORDINATE_OUT);
  });
});

type GetDiagonalCoordinate = {
  coordinate: Coordinate;
  diag: number;
  expected: Coordinate;
};
const getDiagonalCoordinateDescription = (data: GetDiagonalCoordinate) =>
  ` should return ${data.expected.toStr()} for COORDINATE:${data.coordinate.toStr()} DIAG: ${
    data.diag
  }`;

const getDiagonalCoordinateExpect = (data: GetDiagonalCoordinate) => {
  expect(data.coordinate.getDiagonalCoordinate(data.diag)).toStrictEqual(
    data.expected,
  );
};

methodTestMap<GetDiagonalCoordinate>(
  coordinateExample.getDiagonalCoordinate,
  [
    { coordinate: A1, expected: B2, diag: 1 },
    { coordinate: A1, expected: C3, diag: 2 },
    { coordinate: B2, expected: A1, diag: -1 },
  ],
  getDiagonalCoordinateDescription,
  getDiagonalCoordinateExpect,
);
