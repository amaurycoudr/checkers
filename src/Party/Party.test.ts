import { CLASSIC_BOARD, START_BOARD_JSON } from "../Board/BoardState";
import { PlayerBlack, PlayerWhite } from "../Player/Player";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import Party from "./Party";

const startParty = new Party(
  CLASSIC_BOARD,
  new PlayerWhite("moutarde"),
  new PlayerBlack("colonel")
);
methodTest(startParty.getCurrentBoardJSON, () => {
  it("should be START_BOARD_JSON when current board is CLASSIC_BOARD", () => {
    expect(startParty.getCurrentBoardJSON()).toStrictEqual(START_BOARD_JSON);
  });
});

methodTest(startParty.getPlaysPossible, () => {
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
  it("should return startPlayPossible for startParty", () => {
    expect(startParty.getPlaysPossible()).toIncludeSameMembers(
      startPlayPossible
    );
  });
});
