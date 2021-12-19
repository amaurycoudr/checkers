import TravelPlay from "./TravelPlay";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
const from = new Position(0, 1);
const to = new Position(1, 1);
const play = new TravelPlay(from, to);
methodTest(play.toStr, () => {
  it(`should return {from: ${from.toStr()}, to: ${to.toStr()}} for Move(${from.toStr()}, ${to.toStr()})`, () => {
    expect(play.toStr()).toBe(`{from: ${from.toStr()}, to: ${to.toStr()}}`);
  });
});
