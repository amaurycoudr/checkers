import Pawn from "../Pawn/Pawn";
import { pawnBlack, pawnWhite } from "../Pawn/pawns";
import Player from "../Player/Player";
import { playerBlack, playerWhite } from "../Player/players";
import { methodTest } from "../test/utils";
import { BLACK, WHITE } from "../utils/type";

methodTest(pawnBlack.isOpponent, () => {
  it("return false if piece Player has the same color", () => {
    expect(pawnBlack.isOpponent(playerBlack)).toBe(false);
    expect(pawnWhite.isOpponent(playerWhite)).toBe(false);
  });
  it("return true if piece Player has a different color", () => {
    expect(pawnBlack.isOpponent(playerWhite)).toBe(true);
    expect(pawnWhite.isOpponent(playerBlack)).toBe(true);
  });
});
