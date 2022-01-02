import { methodTest, methodTestForMove, methodTestMap } from '../test/utils';
import { BOARD_SIZE_DEFAULT } from '../utils/board';
import { MoveNumber, MoveStr } from '../utils/type';
import { A1, A10, B3, J1, J10 } from './Coordinate/coordinates';
import Position from './Position';

const position = new Position(0, 0);
type InBoardData = {
  position: Position;
  isInBoardShouldReturn: boolean;
};
methodTestMap<InBoardData>(
  position.isInBoard,
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
    expect(data.position.isInBoard(BOARD_SIZE_DEFAULT)).toBe(
      data.isInBoardShouldReturn,
    );
  },
);

methodTest(position.toStr, () => {
  it("for A1 should it return '(0,0)'", () => {
    expect(position.toStr()).toBe(`(${position.getX()},${position.getY()})`);
  });
});

methodTest(position.equals, () => {
  it('return true if x1,y1===x2,y2', () => {
    expect(position.equals(position)).toBe(true);
    expect(position.equals(A10)).toBe(false);
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

methodTestForMove(Position.fromMove, (xMove, yMove) => {
  testForMove((positionArrived: Position, move: MoveStr) => {
    it(`should return ${positionArrived.toStr()} for ${move} `, () => {
      expect(Position.fromMove(move).equals(positionArrived)).toBe(true);
    });
  })(xMove as MoveNumber, yMove as MoveNumber);
});
