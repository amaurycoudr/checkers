import { cloneDeep } from "lodash";
import Board from "../Board/Board";
import {
  BoardState,
  CLASSIC_BOARD,
  EAT_BOARD,
  TWO_PLAY_BOARD,
} from "../Board/BoardState";
import EatenPlay from "../EatenPlay/EatenPlay";
import EmptyBox from "../EmptyBox/EmptyBox";
import Position from "../Position/Position";
import {
  A1,
  A5,
  A7,
  B4,
  B6,
  C3,
  C5,
  C7,
  D4,
  D6,
  E5,
  E7,
  F4,
  F6,
  G5,
  G7,
  H4,
  H6,
  I5,
  I7,
  J4,
  J6,
} from "../Position/positions";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_PLAY_NOT_POSSIBLE } from "../utils/error";
import { BLACK, WHITE } from "../utils/type";
import Party from "./Party";

const startParty = new Party(CLASSIC_BOARD);

const eatParty = new Party(EAT_BOARD);

const whiteFirstTurnPlays = [
  new TravelPlay(B4, A5),
  new TravelPlay(B4, C5),
  new TravelPlay(D4, C5),
  new TravelPlay(D4, E5),
  new TravelPlay(F4, E5),
  new TravelPlay(F4, G5),
  new TravelPlay(H4, G5),
  new TravelPlay(H4, I5),
  new TravelPlay(J4, I5),
];

const blackFirstTurnPlays = [
  new TravelPlay(A7, B6),
  new TravelPlay(C7, B6),
  new TravelPlay(C7, D6),
  new TravelPlay(E7, D6),
  new TravelPlay(E7, F6),
  new TravelPlay(G7, F6),
  new TravelPlay(G7, H6),
  new TravelPlay(I7, H6),
  new TravelPlay(I7, J6),
];

methodTest(startParty.getCurrentBoard, () => {
  it("should return the start board at turn 0", () => {
    expect(startParty.getCurrentBoard()).toStrictEqual(
      new Board(CLASSIC_BOARD)
    );
    expect(eatParty.getCurrentBoard()).toStrictEqual(new Board(EAT_BOARD));
  });
});

methodTest(startParty.getCurrentPlays, () => {
  it("should return whiteFirstTurnPlays at turn 0 white CLASSIC_BOARD", () => {
    expect(startParty.getCurrentPlays()).toIncludeSameMembers(
      whiteFirstTurnPlays
    );
  });
});

methodTest(startParty.playTurn, () => {
  it("should throw playNotPossible if play is not in getCurrentPlays() ", () => {
    expect(() => {
      startParty.playTurn(new TravelPlay(A1, A1));
    }).toThrowError(ERROR_PLAY_NOT_POSSIBLE);
  });

  const playOne = new TravelPlay(new Position(1, 3), new Position(0, 4));

  const onePlayParty = new Party(CLASSIC_BOARD);

  const onePlayBoardState: BoardState = cloneDeep(CLASSIC_BOARD);
  onePlayBoardState[4][0] = onePlayBoardState[3][1];
  onePlayBoardState[3][1] = new EmptyBox();
  const onePlayBoard = new Board(onePlayBoardState);

  onePlayParty.playTurn(playOne);
  it("should return BLACK onePlayBoard blackFirstTurnPlays at black first turn", () => {
    expect(onePlayParty.getCurrentBoard()).toStrictEqual(onePlayBoard);
    expect(onePlayParty.getCurrentPlayer()).toBe(BLACK);
    expect(onePlayParty.getCurrentPlays()).toIncludeSameMembers(
      blackFirstTurnPlays
    );
  });

  const playTwo = new TravelPlay(new Position(0, 6), new Position(1, 5));
  const twoPlayParty = new Party(CLASSIC_BOARD);
  twoPlayParty.playTurn(playOne);
  twoPlayParty.playTurn(playTwo);
  it("should return white after two plays", () => {
    expect(twoPlayParty.getCurrentPlayer()).toBe(WHITE);
  });

  const twoEatenPlayParty = new Party(TWO_PLAY_BOARD);
  const playTwoEaten = new TravelPlay(new Position(0, 0), new Position(2, 2));
  twoEatenPlayParty.playTurn(playTwoEaten);
  const eatenPlays = [new EatenPlay(C3, E5, D4), new EatenPlay(C3, A5, B4)];
  it("should return the same color if the player can play again", () => {
    expect(twoEatenPlayParty.getCurrentPlayer()).toBe(WHITE);
  });
  it("should only return plays for one piece if it is a second play", () => {
    expect(twoEatenPlayParty.getCurrentPlays()).toIncludeSameMembers(
      eatenPlays
    );
  });
});
