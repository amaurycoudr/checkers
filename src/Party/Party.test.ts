import { cloneDeep } from "lodash";
import Board from "../Board/Board";
import {
  BoardState,
  CLASSIC_BOARD,
  START_BOARD_JSON,
  TWO_PLAY_BOARD,
} from "../Board/BoardState";
import Box from "../Box/Box";
import { PlayerBlack, PlayerWhite } from "../Player/Player";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_PLAY_NOT_POSSIBLE } from "../utils/error";
import { BLACK, WHITE } from "../utils/type";
import Party from "./Party";

const startParty = new Party(
  CLASSIC_BOARD,
  new PlayerWhite("moutarde"),
  new PlayerBlack("colonel")
);
methodTest(startParty.getCurrentBoard, () => {
  it("should return CLASSIC_BOARD", () => {
    expect(startParty.getCurrentBoard()).toStrictEqual(
      new Board(CLASSIC_BOARD)
    );
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

methodTest(startParty.playTurn, () => {
  it("should throw if play not possible", () => {
    expect(() => {
      onePlayParty.playTurn(
        new TravelPlay(new Position(0, 1), new Position(1, 2))
      );
    }).toThrowError(ERROR_PLAY_NOT_POSSIBLE);
  });

  const onePlayParty = new Party(
    CLASSIC_BOARD,
    new PlayerWhite("moutarde"),
    new PlayerBlack("colonel")
  );

  const play = new TravelPlay(new Position(1, 3), new Position(0, 4));
  const onePlayBoardState: BoardState = cloneDeep(CLASSIC_BOARD);
  onePlayBoardState[4][0] = onePlayBoardState[3][1];
  onePlayBoardState[3][1] = new Box();
  const onePlayBoard = new Board(onePlayBoardState);
  onePlayParty.playTurn(play);
  it("after onePlay getCurrentBoard should return onePlayBoard", () => {
    expect(onePlayParty.getCurrentBoard()).toStrictEqual(onePlayBoard);
  });

  it("after onePlay getCurrentPlayer should return be black", () => {
    expect(onePlayParty.getCurrentPlayer().getColor()).toBe(BLACK);
  });

  const twoPlayParty = new Party(
    TWO_PLAY_BOARD,
    new PlayerWhite("moutarde"),
    new PlayerBlack("colonel")
  );

  const twoPlay = new TravelPlay(new Position(0, 0), new Position(2, 2));
  twoPlayParty.playTurn(twoPlay);
  it("after onePlay getCurrentPlayer should return white", () => {
    expect(twoPlayParty.getCurrentPlayer().getColor()).toBe(WHITE);
  });
});
