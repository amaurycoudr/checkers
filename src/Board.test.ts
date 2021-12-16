import Board from "./Board";
import { CLASSIC_BOARD, EMPTY_BOARD, ONE_PAWN_BOARD } from "./BoardState";
import Box from "./Box";
import Pawn from "./Pawn";
import Player from "./Player";
import Position from "./Position";
import { forBoard } from "./utils/fn";
import { MoveStr, PieceSituation, TOP, WHITE } from "./utils/type";

const emptyBoard = new Board(EMPTY_BOARD);
const onePawn = new Board(ONE_PAWN_BOARD);
const startBoard = new Board(CLASSIC_BOARD);

const START_BOARD_JSON = {
  A1: { type: "Pawn", player: "white" },
  C1: { type: "Pawn", player: "white" },
  E1: { type: "Pawn", player: "white" },
  G1: { type: "Pawn", player: "white" },
  B2: { type: "Pawn", player: "white" },
  D2: { type: "Pawn", player: "white" },
  F2: { type: "Pawn", player: "white" },
  H2: { type: "Pawn", player: "white" },
  A3: { type: "Pawn", player: "white" },
  C3: { type: "Pawn", player: "white" },
  E3: { type: "Pawn", player: "white" },
  G3: { type: "Pawn", player: "white" },
  B6: { type: "Pawn", player: "black" },
  D6: { type: "Pawn", player: "black" },
  F6: { type: "Pawn", player: "black" },
  H6: { type: "Pawn", player: "black" },
  A7: { type: "Pawn", player: "black" },
  C7: { type: "Pawn", player: "black" },
  E7: { type: "Pawn", player: "black" },
  G7: { type: "Pawn", player: "black" },
  B8: { type: "Pawn", player: "black" },
  D8: { type: "Pawn", player: "black" },
  F8: { type: "Pawn", player: "black" },
  H8: { type: "Pawn", player: "black" },
};

describe("test getBox()", () => {
  it("getBox(new Position(x, y)) should be equal boardState[y][x]", () => {
    forBoard((position, x, y) => {
      expect(emptyBoard.getBox(position)).toBe(EMPTY_BOARD[y][x]);
    });
  });
});

describe("test getJSON()", () => {
  it("getJSON() should return {} for EMPTY_BOARD", () => {
    expect(emptyBoard.getJSON()).toStrictEqual({});
  });
  const whitePawn = new Pawn(new Player(WHITE, TOP, "whire"));
  it(`getJSON() should return { A1: ${JSON.stringify(
    whitePawn.getJSON()
  )} } for ONE_PAWN_BOARD`, () => {
    expect(onePawn.getJSON()).toStrictEqual({ A1: whitePawn.getJSON() });
  });

  it("getJSON() should return START_BOARD_JSON for CLASSIC_BOARD", () => {
    expect(startBoard.getJSON()).toStrictEqual(START_BOARD_JSON);
  });
});
const testUnitGetAroundSituation = (
  position: Position,
  moves: MoveStr[],
  expected: PieceSituation
) => {
  it(`for position: ${position.toStr()}, Moves:${moves.toString()} => ${JSON.stringify(
    expected
  )} `, () => {
    expect(startBoard.getAroundSituation(position, moves)).toStrictEqual(
      expected
    );
  });
};
describe("test getAroundSituation()", () => {
  const A1 = new Position(0, 0);

  testUnitGetAroundSituation(A1, ["+1.+1"], {
    "+1.+1": CLASSIC_BOARD[1][1],
  });
  testUnitGetAroundSituation(A1, ["-1.+1", "+1.+1"], {
    "+1.+1": CLASSIC_BOARD[1][1],
  });
  testUnitGetAroundSituation(A1, ["-1.+1"], {});

  const A3 = new Position(1, 1);

  testUnitGetAroundSituation(A3, ["+1.+1"], {
    "+1.+1": CLASSIC_BOARD[2][2],
  });
  testUnitGetAroundSituation(A3, ["-1.+1", "+1.+1"], {
    "+1.+1": CLASSIC_BOARD[2][2],
    "-1.+1": CLASSIC_BOARD[0][2],
  });
  //testUnitGetAroundSituation(A3, ["-1.+1"], {});
});
