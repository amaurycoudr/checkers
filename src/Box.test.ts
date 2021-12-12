import Box from "./Box";
import Piece from "./Piece";
import Player from "./Player";
import { BLACK, TOP } from "./utils/type";

class FakePieceBox extends Piece {
  getEatenPlay(): [] {
    return [];
  }
  getTravelPlay(): [] {
    return [];
  }
}
const emptyBox = new Box();
const pieceBox = new FakePieceBox(new Player(BLACK, TOP, "test"));
describe("test isNotEmpty()", () => {
  it("should be false if it is not a Piece", () => {
    expect(emptyBox.isNotEmpty()).toBe(false);
  });

  it("should be true if it is not a Piece", () => {
    expect(pieceBox.isNotEmpty()).toBe(true);
  });
});
