import Pawn from "./Pawn";
import Player from "./Player";
import { BLACK, BOTTOM, TOP, WHITE } from "./utils/type";

const blackTopPlayer = new Player(BLACK, TOP, "test");
const whiteBottomPlayer = new Player(WHITE, BOTTOM, "test");

const blackTopPiece = new Pawn(blackTopPlayer);
const whiteBottomPiece = new Pawn(whiteBottomPlayer);

describe("test isOpponent(otherPlayer:Player)", () => {
  it("return false if piece Player has the same color", () => {
    expect(blackTopPiece.isOpponent(blackTopPlayer)).toBe(false);
    expect(whiteBottomPiece.isOpponent(whiteBottomPlayer)).toBe(false);
  });
  it("return true if piece Player has a different color", () => {
    expect(blackTopPiece.isOpponent(whiteBottomPlayer)).toBe(true);
    expect(whiteBottomPiece.isOpponent(blackTopPlayer)).toBe(true);
  });
});
