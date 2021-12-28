import { Position } from "..";
import {
  ONE_PLAY_BOARD_ARRAY,
  START_BOARD_ARRAY,
  START_BOARD_JSON,
} from "../Board/BoardState";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import PublicApi from "./PublicApi";
const party = new PublicApi();

const startPlaysPossible = [
  new TravelPlay(new Position(1, 3), new Position(0, 4)),
  new TravelPlay(new Position(1, 3), new Position(2, 4)),
  new TravelPlay(new Position(3, 3), new Position(2, 4)),
  new TravelPlay(new Position(3, 3), new Position(4, 4)),
  new TravelPlay(new Position(5, 3), new Position(4, 4)),
  new TravelPlay(new Position(5, 3), new Position(6, 4)),
  new TravelPlay(new Position(7, 3), new Position(6, 4)),
  new TravelPlay(new Position(7, 3), new Position(8, 4)),
  new TravelPlay(new Position(9, 3), new Position(8, 4)),
].map((play) => play.getJSON());

methodTest(party.getState, () => {
  it("should return board === START_BOARD_ARRAY at the start", () => {
    expect(party.getState().board).toStrictEqual(START_BOARD_ARRAY);
  });

  it("should return plays === startPlayPossible at the start", () => {
    expect(party.getState().plays).toIncludeSameMembers(startPlaysPossible);
  });

  it("should return  board === ONE_PLAY_BOARD_ARRAY after play({ from: 'B4', to: 'A5' })", () => {
    party.play({ from: "B4", to: "A5" });
    expect(party.getState().board).toStrictEqual(ONE_PLAY_BOARD_ARRAY);
  });
});
