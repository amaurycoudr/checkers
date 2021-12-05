import { Player } from ".";
import Piece from "./Piece";
import { BLACK, TOP } from "./utils/type";
class FakePiece extends Piece {
  getEatenMoves(): [] {
    return [];
  }
  getTravelMoves(): [] {
    return [];
  }
}
describe("test constructor", () => {
  it("don't throw error", () => {
    new FakePiece(new Player(BLACK, TOP, "test"));
  });
});
