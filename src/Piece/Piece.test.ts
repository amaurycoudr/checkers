import { pawnBlack, pawnWhite } from "../Pawn/pawns";
import { playerBlack, playerWhite } from "../Player/players";
import { methodTest } from "../test/utils";

methodTest(pawnBlack.isOpponent, () => {
  it("return false if piece.player has the same color", () => {
    expect(pawnBlack.isOpponent(playerBlack)).toBe(false);
    expect(pawnWhite.isOpponent(playerWhite)).toBe(false);
  });
  it("return true if piece.player has a different color", () => {
    expect(pawnBlack.isOpponent(playerWhite)).toBe(true);
    expect(pawnWhite.isOpponent(playerBlack)).toBe(true);
  });
});

methodTest(pawnBlack.equals, () => {
  it("return true if piece.player and piece.type are equals ", () => {
    expect(pawnBlack.equals(pawnBlack)).toBe(true);
    expect(pawnWhite.equals(pawnWhite)).toBe(true);
  });
  it("return false if piece.player or piece.type are differents ", () => {
    expect(pawnBlack.equals(pawnBlack)).toBe(true);
    expect(pawnWhite.equals(pawnWhite)).toBe(true);
  });
});
