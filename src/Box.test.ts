import Piece from "./Piece";
import Player from "./Player";
import Box from "./Box";
import { BLACK, TOP } from "./utils/type";
import { BOX_NOT_PIECE } from "./utils/error";

class FakeEmptyBox extends Box {}
class FakePieceBox extends Piece {
  getEatenMoves(): [] {
    return [];
  }
  getTravelMoves(): [] {
    return [];
  }
}
const emptyBox = new FakeEmptyBox();
const pieceBox = new FakePieceBox(new Player(BLACK, TOP, "test"));
describe("test isNotEmpty()", () => {
  it("should be false if it is not a Piece", () => {
    expect(emptyBox.isNotEmpty()).toBe(false);
  });

  it("should be true if it is not a Piece", () => {
    expect(pieceBox.isNotEmpty()).toBe(true);
  });
});

describe("test getPiece()", () => {
  it(`should throw ${BOX_NOT_PIECE} if it is not a Piece`, () => {
    expect(() => {
      emptyBox.getPiece();
    }).toThrow(new Error(BOX_NOT_PIECE));
  });

  it(`should return the Object if it class extends Piece`, () => {
    expect(pieceBox.getPiece() instanceof Piece).toBe(true);
  });
});
