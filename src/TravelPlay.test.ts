import TravelPlay from "./TravelPlay";
import Position from "./Position";
const from = new Position(0, 1);
const to = new Position(1, 1);
const play = new TravelPlay(from, to);
describe("test toStr()", () => {
  it(`should return {from: ${from.toStr()}, to: ${to.toStr()}} for Move(${from.toStr()}, ${to.toStr()})`, () => {
    expect(play.toStr()).toBe(`{from: ${from.toStr()}, to: ${to.toStr()}}`);
  });
});
