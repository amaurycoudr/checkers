import Coordinates from "../Position/Coordinate/Coordinate";
import { methodTest } from "../test/utils";
import TravelPlay from "./TravelPlay";
const from = new Coordinates(0, 1);
const to = new Coordinates(1, 1);
const play1 = new TravelPlay(from, to);
const play1Bis = new TravelPlay(from, to);
const play2 = new TravelPlay(to, from);
const play1JSON = { from: from.toStr(), to: to.toStr() };
methodTest(play1.toStr, () => {
  it(`should return {from: ${from.toStr()}, to: ${to.toStr()}} for Move(${from.toStr()}, ${to.toStr()})`, () => {
    expect(play1.toStr()).toBe(`{from: ${from.toStr()}, to: ${to.toStr()}}`);
  });
});

methodTest(play1.equals, () => {
  it(`should return false for ${play1.toStr()} equals ${play2.toStr()}`, () => {
    expect(play1.equals(play2)).toBeFalse();
  });

  it(`should return true for ${play1.toStr()} equals ${play1Bis.toStr()}`, () => {
    expect(play1.equals(play1Bis)).toBeTrue();
  });
});

methodTest(play1.getJSON, () => {
  it(`should return ${JSON.stringify(play1JSON)} for ${play1.toStr()}`, () => {
    expect(play1.getJSON()).toStrictEqual(play1JSON);
  });
});

methodTest(TravelPlay.fromJson, () => {
  it(`should return ${play1.toStr()} from ${JSON.stringify(
    play1JSON
  )} `, () => {
    expect(TravelPlay.fromJson(play1JSON)).toStrictEqual(play1);
  });
});
