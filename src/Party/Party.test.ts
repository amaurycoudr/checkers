import { cloneDeep } from "lodash";
import Board from "../Board/Board";
import { BoardState, CLASSIC_BOARD, TWO_PLAY_BOARD } from "../Board/BoardState";
import EmptyBox from "../EmptyBox/EmptyBox";
import Position from "../Position/Position";
import { B4, D4, F4 } from "../Position/positions";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_PLAY_NOT_POSSIBLE } from "../utils/error";
import { BLACK, WHITE } from "../utils/type";
import Party from "./Party";

const startParty = new Party(CLASSIC_BOARD);
methodTest(startParty.getCurrentBoard, () => {
  it("should return CLASSIC_BOARD", () => {
    expect(startParty.getCurrentBoard()).toStrictEqual(
      new Board(CLASSIC_BOARD)
    );
  });
});

methodTest(startParty.getPlaysPossible, () => {
  const startPlayPossible = [
    new TravelPlay(B4, new Position(0, 4)),
    new TravelPlay(B4, new Position(2, 4)),
    new TravelPlay(D4, new Position(2, 4)),
    new TravelPlay(D4, new Position(4, 4)),
    new TravelPlay(F4, new Position(4, 4)),
    new TravelPlay(F4, new Position(6, 4)),
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
      startParty.playTurn(
        new TravelPlay(new Position(0, 1), new Position(1, 2))
      );
    }).toThrowError(ERROR_PLAY_NOT_POSSIBLE);
  });

  const playOne = new TravelPlay(new Position(1, 3), new Position(0, 4));
  const playTwo = new TravelPlay(new Position(0, 6), new Position(1, 5));

  it("after onePlay getCurrentBoard should return onePlayBoard and getCurrentPlayer should return be black", () => {
    const onePlayParty = new Party(CLASSIC_BOARD);
    const onePlayBoardState: BoardState = cloneDeep(CLASSIC_BOARD);
    onePlayBoardState[4][0] = onePlayBoardState[3][1];
    onePlayBoardState[3][1] = new EmptyBox();
    const onePlayBoard = new Board(onePlayBoardState);
    onePlayParty.playTurn(playOne);
    expect(onePlayParty.getCurrentBoard()).toStrictEqual(onePlayBoard);
    expect(onePlayParty.getCurrentPlayer()).toBe(BLACK);
  });

  const twoPlayParty = new Party(CLASSIC_BOARD);

  twoPlayParty.playTurn(playOne);
  twoPlayParty.playTurn(playTwo);

  it("after twoPlay getCurrentPlayer should return be white", () => {
    expect(twoPlayParty.getCurrentPlayer()).toBe(WHITE);
  });

  const twoEatenPlayParty = new Party(TWO_PLAY_BOARD);

  const playTwoEaten = new TravelPlay(new Position(0, 0), new Position(2, 2));
  twoEatenPlayParty.playTurn(playTwoEaten);
  it("after onePlay getCurrentPlayer should still be white", () => {
    expect(twoEatenPlayParty.getCurrentPlayer()).toBe(WHITE);
  });
});
