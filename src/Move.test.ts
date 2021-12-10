import Move from "./Move";
import Position from "./Position";
const from = Position.LEFT_TOP;
const to = Position.LEFT_BOTTOM;
const move = new Move(from, to);
describe("test toStr()", () => {
  it(`should return {from: ${from.toStr()}, to: ${to.toStr()}} for Move(${from.toStr()}, ${to.toStr()})`, () => {
    expect(move.toStr()).toBe(`{from: ${from.toStr()}, to: ${to.toStr()}}`);
  });
});
