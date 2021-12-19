import Player from "./Player";
import { BLACK, BOTTOM, TOP, WHITE } from "../utils/type";
import { methodTest } from "../test/utils";
const name = "namePlayer";

const playerBlackBottom = new Player(BLACK, BOTTOM, name);
const playerWhiteTop = new Player(WHITE, TOP, name);
methodTest(playerBlackBottom.toStr, () => {
  it("should return ${name} the ${color} player ", () => {
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
  it("should return false if position " + TOP, () => {
    expect(playerWhiteTop.isTop()).toBe(true);
  });
  it("should return false if position " + BOTTOM, () => {
    expect(playerBlackBottom.isTop()).toBe(false);
  });
});
