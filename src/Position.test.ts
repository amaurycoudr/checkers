import Position from "./Position";
import { INDEX_MAX, INDEX_MIN } from "./utils/board";
import { ERROR_COORDINATE_OUT } from "./utils/error";
import { forBoard, forMove } from "./utils/fn";
import {
  Coordinates,
  coordinatesX,
  coordinatesY,
  MoveNumber,
  MoveStr,
} from "./utils/type";

const X = 1;
const Y = 2;
const infMin = INDEX_MIN - 3;
const supMax = INDEX_MAX + 2;

const position = new Position(X, Y);

const positionYInfMin = new Position(X, infMin);
const positionYISupMin = new Position(X, supMax);
const positionXInfMin = new Position(infMin, Y);
const positionXISupMin = new Position(supMax, Y);

describe("test isInBoard()", () => {
  it("return true when the Position is in the board and false otherwise", () => {
    const expectInBoardToBe = (position: Position, toBe: boolean) =>
      expect(position.isInBoard()).toBe(toBe);

    expectInBoardToBe(position, true);

    expectInBoardToBe(positionYInfMin, false);
    expectInBoardToBe(positionYISupMin, false);
    expectInBoardToBe(positionXInfMin, false);
    expectInBoardToBe(positionXISupMin, false);
  });
});

describe("test toStr()", () => {
  it("for new Position(X,Y) it return '(X,Y)'", () => {
    expect(position.toStr()).toBe(`(${X},${Y})`);
  });
});

describe("test equals(Position p)", () => {
  it("return true if x1,y1===x2,y2", () => {
    expect(position.equals(position)).toBe(true);
    expect(position.equals(positionYInfMin)).toBe(false);
  });
});

const testMove = (start: Position, move: Position, arrived: Position) =>
  it(`return ${arrived.toStr()} if move was ${move.toStr()} and start ${start.toStr()}`, () => {
    expect(start.getArrivalPosition(move).equals(arrived)).toBe(true);
  });
describe("test getArrivalPosition(Position move)", () => {
  testMove(new Position(X, Y), new Position(0, 1), new Position(X, Y + 1));
  testMove(new Position(X, Y), new Position(1, 1), new Position(X + 1, Y + 1));
  testMove(new Position(X, Y), new Position(1, 0), new Position(X + 1, Y));
  testMove(new Position(X, Y), new Position(0, 0), new Position(X, Y));
});

const testCoordinatesToPosition = (
  position: Position,
  x: number,
  y: number
) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`getPositionFromCoordinate(${coordinates}) should return ${position.toStr()}`, () => {
    expect(
      Position.getPositionFromCoordinate(coordinates).equals(position)
    ).toBe(true);
  });
};
describe("test getPositionFromCoordinate(coordinates: Coordinates) ", () => {
  forBoard(testCoordinatesToPosition);
});

const testPositionForGetCoordinate = (
  position: Position,
  x: number,
  y: number
) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`getCoordinate() of ${position.toStr()} should return ${coordinates}`, () => {
    expect(position.getCoordinate()).toBe(coordinates);
  });
};
describe("test getCoordinate() normal return", () => {
  forBoard(testPositionForGetCoordinate);
});

describe("test getCoordinate() error", () => {
  it(`should throw en error if the position is out of bond`, () => {
    expect(() => positionYInfMin.getCoordinate()).toThrow(ERROR_COORDINATE_OUT);
  });
});
const testForMove =
  (test: (position: Position, move: MoveStr) => void) =>
  (position: Position, x: MoveNumber, y: MoveNumber) => {
    const move1: MoveStr = `+${x}.+${y}`;

    const move2: MoveStr = `-${x}.+${y}`;
    const position2 = new Position(-x, y);

    const move3: MoveStr = `-${x}.-${y}`;
    const position3 = new Position(-x, -y);

    const move4: MoveStr = `+${x}.-${y}`;
    const position4 = new Position(x, -y);
    test(position, move1);
    test(position2, move2);
    test(position3, move3);
    test(position4, move4);
  };
const unitTestForGetPositionFromMove = (position: Position, move: MoveStr) =>
  it(`getPositionFromMove(${move}) should return ${position.toStr()}`, () => {
    expect(Position.getPositionFromMove(move).equals(position)).toBe(true);
  });

describe("test getPositionFromMove() normal return", () => {
  forMove(testForMove(unitTestForGetPositionFromMove));
});
