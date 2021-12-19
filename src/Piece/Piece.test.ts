import Pawn from "../Pawn/Pawn";
import Player from "../Player/Player";
import { methodTest } from "../test/utils";
import { BLACK, WHITE } from "../utils/type";

const blackTopPlayer = new Player(BLACK, "test");
const whiteBottomPlayer = new Player(WHITE, "test");

const blackTopPiece = new Pawn(blackTopPlayer);
const whiteBottomPiece = new Pawn(whiteBottomPlayer);

methodTest(blackTopPiece.isOpponent, () => {
  it("return false if piece Player has the same color", () => {
    expect(blackTopPiece.isOpponent(blackTopPlayer)).toBe(false);
    expect(whiteBottomPiece.isOpponent(whiteBottomPlayer)).toBe(false);
  });
  it("return true if piece Player has a different color", () => {
    expect(blackTopPiece.isOpponent(whiteBottomPlayer)).toBe(true);
    expect(whiteBottomPiece.isOpponent(blackTopPlayer)).toBe(true);
  });
});
