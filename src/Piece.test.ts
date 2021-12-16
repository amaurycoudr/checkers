import Piece from "./Piece";
import Player from "./Player";
import { BLACK, BOTTOM, PieceJSON, TOP, WHITE } from "./utils/type";
class FakePiece extends Piece {
  eatenMoves = [];
  travelMoves = [];

  getEatenPlays(): [] {
    return [];
  }
  getTravelPlays(): [] {
    return [];
  }
  getJSON(): PieceJSON {
    return { player: this.player.getColor(), type: "fakePiece" };
  }
}
const blackTopPlayer = new Player(BLACK, TOP, "test");
const whiteBottomPlayer = new Player(WHITE, BOTTOM, "test");

const blackTopPiece = new FakePiece(blackTopPlayer);
const whiteBottomPiece = new FakePiece(whiteBottomPlayer);
describe("test constructor", () => {
  it("don't throw error", () => {});
});

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
