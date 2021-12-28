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
import {
  methodTest,
  methodTestFordBoard,
  methodTestForMove,
  methodTestMap,
} from "../test/utils";
import { A1, A10, B10, B3, J1, J10 } from "./positions";

const X = 1;
const Y = 2;
const infMin = INDEX_MIN - 3;

const positionYInfMin = new Position(X, infMin);

type InBoardData = {
  position: Position;
  isInBoardShouldReturn: boolean;
};
methodTestMap<InBoardData>(
  A1.isInBoard,
  [
    { position: A1, isInBoardShouldReturn: true },
    { position: A10, isInBoardShouldReturn: true },
    { position: J1, isInBoardShouldReturn: true },
    { position: J10, isInBoardShouldReturn: true },
    { position: B3, isInBoardShouldReturn: true },
    { position: new Position(-1, -1), isInBoardShouldReturn: false },
    { position: new Position(-1, 1), isInBoardShouldReturn: false },
    { position: new Position(1, -1), isInBoardShouldReturn: false },
    { position: new Position(1, -10), isInBoardShouldReturn: false },
    { position: new Position(-10, 1), isInBoardShouldReturn: false },
  ],
  (data) =>
    `should return ${data.isInBoardShouldReturn} for ${data.position.toStr()}`,
  (data) => {
    expect(data.position.isInBoard()).toBe(data.isInBoardShouldReturn);
  }
);

methodTest(A1.toStr, () => {
  it("for A1 should it return '(0,0)'", () => {
    expect(A1.toStr()).toBe(`(${A1.getX()},${A1.getY()})`);
  });
});

methodTest(A1.equals, () => {
  it("return true if x1,y1===x2,y2", () => {
    expect(A1.equals(A1)).toBe(true);
    expect(A1.equals(A10)).toBe(false);
  });
});

const testForMove =
  (test: (positionArrived: Position, move: MoveStr) => void) =>
  (xMove: MoveNumber, yMove: MoveNumber) => {
    const movePP = `+${xMove}.+${yMove}` as MoveStr;
    const positionPP = new Position(+xMove, +yMove);

    const moveMP = `-${xMove}.+${yMove}` as MoveStr;
    const positionMP = new Position(-xMove, +yMove);

    const moveMM = `-${xMove}.-${yMove}` as MoveStr;
    const positionMM = new Position(-xMove, -yMove);

    const movePM = `+${xMove}.-${yMove}` as MoveStr;
    const positionPM = new Position(+xMove, -yMove);
    test(positionPP, movePP);
    test(positionPM, movePM);
    test(positionMP, moveMP);
    test(positionMM, moveMM);
  };

methodTestForMove(A1.getArrivalPosition, (xMove, yMove) => {
  testForMove((positionArrived: Position, move: MoveStr) => {
    it(`should return ${positionArrived.toStr()} for MOVE: ${move} (from A1) `, () => {
      expect(A1.getArrivalPosition(move)).toStrictEqual(positionArrived);
    });
  })(xMove as MoveNumber, yMove as MoveNumber);
});

methodTestForMove(Position.fromMove, (xMove, yMove) => {
  testForMove((positionArrived: Position, move: MoveStr) => {
    it(`should return ${positionArrived.toStr()} for ${move} `, () => {
      expect(Position.fromMove(move).equals(positionArrived)).toBe(true);
    });
  })(xMove as MoveNumber, yMove as MoveNumber);
});

methodTestFordBoard(Position.fromCoordinate, (position, x, y) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${position.toStr()} for ${coordinates} `, () => {
    expect(Position.fromCoordinate(coordinates).equals(position)).toBe(true);
  });
});

methodTestFordBoard(A1.getCoordinate, (position, x, y) => {
  const coordinates: Coordinates = `${coordinatesX[x]}${coordinatesY[y]}`;
  it(`should return ${coordinates} for ${position.toStr()} `, () => {
    expect(position.getCoordinate()).toBe(coordinates);
  });
});

methodTest(A1.getCoordinate, () => {
  it(`should throw en error if the position is out of bond`, () => {
    expect(() => new Position(-1, 0).getCoordinate()).toThrow(
      ERROR_COORDINATE_OUT
    );
  });
});
