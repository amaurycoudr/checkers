import { methodTest } from "../test/utils";
import { BLACK, WHITE } from "../utils/type";
import Player from "./Player";

const playerBlackBottom = new Player(BLACK);
const playerWhiteTop = new Player(WHITE);
methodTest(playerBlackBottom.toStr, () => {
  it(`should return ${BLACK} player `, () => {
    expect(playerBlackBottom.toStr()).toBe(`${BLACK} player`);
  });
});

methodTest(playerBlackBottom.equals, () => {
  it("should return true if same color", () => {
    expect(playerBlackBottom.equals(playerBlackBottom)).toBe(true);
  });
  it("should return false if different color", () => {
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
