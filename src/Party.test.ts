import { CLASSIC_BOARD, START_BOARD_JSON } from "./Board/BoardState";
import Party from "./Party";
import { PlayerBlack, PlayerWhite } from "./Player";
import Position from "./Position";
import TravelPlay from "./TravelPlay";
import { BOTTOM, TOP } from "./utils/type";

const startParty = new Party(
  CLASSIC_BOARD,
  new PlayerWhite(BOTTOM, "moutarde"),
  new PlayerBlack(TOP, "colonel")
);
describe("test getCurrentBoardJSON()", () => {
  it("should be START_BOARD_JSON when current board is CLASSIC_BOARD", () => {
    expect(startParty.getCurrentBoardJSON()).toStrictEqual(START_BOARD_JSON);
  });
});

describe("test getPlaysPossible()", () => {
  const startPlayPossible = [
    new TravelPlay(new Position(1, 3), new Position(0, 4)),
    new TravelPlay(new Position(1, 3), new Position(2, 4)),
    new TravelPlay(new Position(3, 3), new Position(2, 4)),
    new TravelPlay(new Position(3, 3), new Position(4, 4)),
    new TravelPlay(new Position(5, 3), new Position(4, 4)),
    new TravelPlay(new Position(5, 3), new Position(6, 4)),
    new TravelPlay(new Position(7, 3), new Position(6, 4)),
    new TravelPlay(new Position(7, 3), new Position(8, 4)),
    new TravelPlay(new Position(9, 3), new Position(8, 4)),
  ];
  it("should plays possible should be startPlayPossible", () => {
    expect(startParty.getPlaysPossible()).toIncludeSameMembers(
      startPlayPossible
    );
  });
});
