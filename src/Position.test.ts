import Position from "./Position";
import { INDEX_MAX, INDEX_MIN } from "./utils/board";
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

describe("test equals(Position p) ", () => {
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
