import { Player } from ".";
import { BLACK, BOTTOM, TOP, WHITE } from "./utils/type";
const name = "namePlayer";

const playerBlackBottom = new Player(BLACK, BOTTOM, name);
const playerWhiteTop = new Player(WHITE, TOP, name);
describe("test toStr()", () => {
  it("should return ${name} the ${color} player ", () => {
    expect(playerBlackBottom.toStr()).toBe(`${name} the ${BLACK} player`);
  });
});

describe("test equals(player P)", () => {
  it("should return true if same color", () => {
    expect(playerBlackBottom.equals(playerBlackBottom)).toBe(true);
  });
  it("should return false if same color", () => {
    expect(playerBlackBottom.equals(playerWhiteTop)).toBe(false);
  });
});

describe("test isTop()", () => {
  it("should return false if position " + TOP, () => {
    expect(playerWhiteTop.isTop()).toBe(true);
  });
  it("should return false if position " + BOTTOM, () => {
    expect(playerBlackBottom.isTop()).toBe(false);
  });
});
