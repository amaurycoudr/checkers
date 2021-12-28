import Pawn from "../Pawn/Pawn";
import Player from "../Player/Player";
import { methodTest } from "../test/utils";
import { BLACK } from "../utils/type";
import Box from "./Box";

const emptyBox = new Box();
const pieceBox = new Pawn(new Player(BLACK));
methodTest(emptyBox.isPiece, () => {
  it("should be false if it is not a Piece", () => {
    expect(emptyBox.isPiece()).toBe(false);
  });
});

methodTest(emptyBox.equals, () => {
  it("should be false if it is not a box", () => {
    expect(emptyBox.equals(pieceBox)).toBe(false);
  });

  it("should be true if it is a box", () => {
    expect(emptyBox.equals(emptyBox)).toBe(true);
  });
});
