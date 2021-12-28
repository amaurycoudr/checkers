import Position from "./Position";
import { INDEX_MAX, INDEX_MIN } from "../utils/board";
import { ERROR_COORDINATE_OUT } from "../utils/error";
import { forBoard, forMove } from "../utils/fn";
import {
  Coordinates,
  coordinatesX,
  coordinatesY,
  MoveNumber,
  MoveStr,
} from "../utils/type";
import { methodTest } from "../test/utils";

const X = 1;
const Y = 2;
const infMin = INDEX_MIN - 3;
const supMax = INDEX_MAX + 2;

const position = new Position(X, Y);
const positionLimitMin = new Position(INDEX_MIN, INDEX_MIN);
const positionLimitMinMax = new Position(INDEX_MAX, INDEX_MAX);

const positionYInfMin = new Position(X, infMin);
const positionYISupMin = new Position(X, supMax);
const positionXInfMin = new Position(infMin, Y);
const positionXISupMin = new Position(supMax, Y);

methodTest(position.isInBoard, () => {
  it("return true when the Position is in the board and false otherwise", () => {
    const expectInBoardToBe = (position: Position, toBe: boolean) =>
      expect(position.isInBoard()).toBe(toBe);

    expectInBoardToBe(position, true);
    expectInBoardToBe(positionLimitMin, true);
    expectInBoardToBe(positionLimitMinMax, true);

    expectInBoardToBe(positionYInfMin, false);
    expectInBoardToBe(positionYISupMin, false);
    expectInBoardToBe(positionXInfMin, false);
    expectInBoardToBe(positionXISupMin, false);
  });
});

methodTest(position.toStr, () => {
  it("for new Position(X,Y) it return '(X,Y)'", () => {
    expect(position.toStr()).toBe(`(${X},${Y})`);
  });
});

methodTest(position.equals, () => {
  it("return true if x1,y1===x2,y2", () => {
    expect(position.equals(position)).toBe(true);
    expect(position.equals(positionYInfMin)).toBe(false);
  });
});

methodTest(position.getArrivalPosition, () => {
  const testMove = (start: Position, move: MoveStr, arrived: Position) =>
    it(`return ${arrived.toStr()} if move was ${move} and start ${start.toStr()}`, () => {
      expect(start.getArrivalPosition(move).equals(arrived)).toBe(true);
    });
  testMove(new Position(X, Y), "+1.+1", new Position(X + 1, Y + 1));
  testMove(new Position(X, Y), "+1.-1", new Position(X + 1, Y - 1));
  testMove(new Position(X, Y), "-1.-1", new Position(X - 1, Y - 1));
});

const testCoordinatesToPosition = (
  position: Position,
  x: number,
  y: number
) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${position.toStr()} for ${coordinates} `, () => {
    expect(
      Position.fromCoordinate(coordinates).equals(position)
    ).toBe(true);
  });
};
methodTest(Position.fromCoordinate, () => {
  forBoard(testCoordinatesToPosition);
});

const testPositionForGetCoordinate = (
  position: Position,
  x: number,
  y: number
) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${coordinates} for ${position.toStr()} `, () => {
    expect(position.getCoordinate()).toBe(coordinates);
  });
};
methodTest(position.getCoordinate, () => {
  forBoard(testPositionForGetCoordinate);
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
    expect(Position.fromMove(move).equals(position)).toBe(true);
  });

methodTest(Position.fromMove, () => {
  forMove(testForMove(unitTestForGetPositionFromMove));
});
