import { methodTest } from "../test/utils";
import { BLACK, WHITE } from "../utils/type";
import Player from "./Player";
const name = "namePlayer";

const playerBlackBottom = new Player(BLACK, name);
const playerWhiteTop = new Player(WHITE, name);
methodTest(playerBlackBottom.toStr, () => {
  it(`should return ${name} the ${WHITE} player `, () => {
    expect(playerBlackBottom.toStr()).toBe(`${name} the ${BLACK} player`);
  });
});

methodTest(playerBlackBottom.equals, () => {
  it("should return true if same color", () => {
    expect(playerBlackBottom.equals(playerBlackBottom)).toBe(true);
  });
  it("should return false if same color", () => {
    expect(playerBlackBottom.equals(playerWhiteTop)).toBe(false);
  });
});

methodTest(playerBlackBottom.isTop, () => {
  it("should return false if is " + WHITE, () => {
    expect(playerWhiteTop.isTop()).toBe(false);
  });
  it("should return true if is " + BLACK, () => {
    expect(playerBlackBottom.isTop()).toBe(true);
  });
});

methodTest(playerBlackBottom.getJSON, () => {
  const blackJson = { color: BLACK, name };
  it(`should return ${JSON.stringify(blackJson)}`, () => {
    expect(playerBlackBottom.getJSON()).toStrictEqual(blackJson);
  });
});
