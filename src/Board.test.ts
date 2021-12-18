import Board from "./Board";
import {
  a1PawnBoard,
  CLASSIC_BOARD,
  EAT_BOARD,
  EMPTY_BOARD,
  ONE_WHITE_PAWN_BOARD,
} from "./BoardState";
import EatenPlay from "./EatenPlay";
import Pawn from "./Pawn";
import Piece from "./Piece";
import Player from "./Player";
import Position from "./Position";
import TravelPlay from "./TravelPlay";
import { ERROR_OUT_OF_BOUND } from "./utils/error";
import { forBoard } from "./utils/fn";
import {
  BLACK,
  BOTTOM,
  MoveStr,
  PieceSituation,
  TOP,
  WHITE,
} from "./utils/type";

const emptyBoard = new Board(EMPTY_BOARD);
const onePawnBoard = new Board(ONE_WHITE_PAWN_BOARD);
const startBoard = new Board(CLASSIC_BOARD);
const eatBoard = new Board(EAT_BOARD);

const START_BOARD_JSON = {
  A1: { type: "Pawn", player: "white" },
  C1: { type: "Pawn", player: "white" },
  E1: { type: "Pawn", player: "white" },
  G1: { type: "Pawn", player: "white" },
  I1: { type: "Pawn", player: "white" },
  B2: { type: "Pawn", player: "white" },
  D2: { type: "Pawn", player: "white" },
  F2: { type: "Pawn", player: "white" },
  H2: { type: "Pawn", player: "white" },
  J2: { type: "Pawn", player: "white" },
  A3: { type: "Pawn", player: "white" },
  C3: { type: "Pawn", player: "white" },
  E3: { type: "Pawn", player: "white" },
  G3: { type: "Pawn", player: "white" },
  I3: { type: "Pawn", player: "white" },
  B4: { type: "Pawn", player: "white" },
  D4: { type: "Pawn", player: "white" },
  F4: { type: "Pawn", player: "white" },
  H4: { type: "Pawn", player: "white" },
  J4: { type: "Pawn", player: "white" },
  A7: { type: "Pawn", player: "black" },
  C7: { type: "Pawn", player: "black" },
  E7: { type: "Pawn", player: "black" },
  G7: { type: "Pawn", player: "black" },
  I7: { type: "Pawn", player: "black" },
  B8: { type: "Pawn", player: "black" },
  D8: { type: "Pawn", player: "black" },
  F8: { type: "Pawn", player: "black" },
  H8: { type: "Pawn", player: "black" },
  J8: { type: "Pawn", player: "black" },
  A9: { type: "Pawn", player: "black" },
  C9: { type: "Pawn", player: "black" },
  E9: { type: "Pawn", player: "black" },
  G9: { type: "Pawn", player: "black" },
  I9: { type: "Pawn", player: "black" },
  B10: { type: "Pawn", player: "black" },
  D10: { type: "Pawn", player: "black" },
  F10: { type: "Pawn", player: "black" },
  H10: { type: "Pawn", player: "black" },
  J10: { type: "Pawn", player: "black" },
};

describe("test getBox()", () => {
  it("getBox(new Position(x, y)) should be equal boardState[y][x]", () => {
    forBoard((position, x, y) => {
      expect(emptyBoard.getBox(position)).toBe(EMPTY_BOARD[y][x]);
    });
  });
  it("getBox(new Position(x, y)) throw an error if out of bound", () => {
    expect(() => emptyBoard.getBox(new Position(-1, -1))).toThrowError(
      ERROR_OUT_OF_BOUND
    );
  });
});

describe("test getJSON()", () => {
  it("getJSON() should return {} for EMPTY_BOARD", () => {
    expect(emptyBoard.getJSON()).toStrictEqual({});
  });
  const whitePawn = new Pawn(new Player(WHITE, TOP, "white"));
  it(`getJSON() should return { A1: ${JSON.stringify(
    whitePawn.getJSON()
  )} } for ONE_PAWN_BOARD`, () => {
    expect(onePawnBoard.getJSON()).toStrictEqual({ A1: whitePawn.getJSON() });
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

  const A2 = new Position(1, 0);
  testUnitGetAroundSituation(A2, ["-1.-1"], {});
});

describe("test getEatenPlay()", () => {
  const pawnWhite = new Pawn(new Player(WHITE, BOTTOM, "white"));
  const pawnBlack = new Pawn(new Player(BLACK, TOP, "white"));
  type testEatenPlay = {
    position: Position;
    piece: Piece;
    eatenPlaysExpected: EatenPlay[];
  };
  const testGetEatenPlay: testEatenPlay[] = [
    {
      position: new Position(0, 0),
      piece: pawnWhite,
      eatenPlaysExpected: [
        new EatenPlay(
          new Position(0, 0),
          new Position(2, 2),
          new Position(1, 1)
        ),
      ],
    },
    {
      position: new Position(2, 0),
      piece: pawnWhite,
      eatenPlaysExpected: [
        new EatenPlay(
          new Position(2, 0),
          new Position(0, 2),
          new Position(1, 1)
        ),
        new EatenPlay(
          new Position(2, 0),
          new Position(4, 2),
          new Position(3, 1)
        ),
      ],
    },
    {
      position: new Position(1, 1),
      piece: pawnBlack,
      eatenPlaysExpected: [],
    },
    {
      position: new Position(2, 4),
      piece: pawnBlack,
      eatenPlaysExpected: [
        new EatenPlay(
          new Position(2, 4),
          new Position(0, 2),
          new Position(1, 3)
        ),
        new EatenPlay(
          new Position(2, 4),
          new Position(4, 2),
          new Position(3, 3)
        ),
        new EatenPlay(
          new Position(2, 4),
          new Position(4, 6),
          new Position(3, 5)
        ),
        new EatenPlay(
          new Position(2, 4),
          new Position(0, 6),
          new Position(1, 5)
        ),
      ],
    },
  ];
  const unitTestEatenPlay = ({
    position,
    piece,
    eatenPlaysExpected,
  }: {
    position: Position;
    piece: Piece;
    eatenPlaysExpected: EatenPlay[];
  }) => {
    it(`should return [${eatenPlaysExpected.map((eatenPlay) =>
      eatenPlay.toStr()
    )}] for ${JSON.stringify(piece.getJSON())} in ${position.toStr()}`, () =>
      expect(eatBoard.getPieceEatenPlays(piece, position)).toIncludeSameMembers(
        eatenPlaysExpected
      ));
  };
  testGetEatenPlay.map(unitTestEatenPlay);
});

describe("test getPlayerPieces()", () => {
  const whitePlayer = new Player(WHITE, TOP, "test");
  const blackPlayer = new Player(BLACK, BOTTOM, "test");
  const a1WhitePawnBoard = new Board(a1PawnBoard(whitePlayer));
  it("should return {} for emptyBoard", () => {
    expect(emptyBoard.getPlayerPieces(whitePlayer)).toStrictEqual({});
  });

  it(`should return {a1:Pawn} for whitePlayer a1WhitePawnBoard`, () => {
    expect(a1WhitePawnBoard.getPlayerPieces(whitePlayer)).toStrictEqual({
      A1: new Pawn(whitePlayer),
    });
  });

  it(`should return {} for blackPlayer a1WhitePawnBoard`, () => {
    expect(a1WhitePawnBoard.getPlayerPieces(blackPlayer)).toStrictEqual({});
  });
});

describe("test getPieceTravelPlays()", () => {
  const pawnWhite = new Pawn(new Player(WHITE, BOTTOM, "white"));
  const pawnBlack = new Pawn(new Player(BLACK, TOP, "white"));
  type testTravelPlay = {
    position: Position;
    piece: Piece;
    travelPlaysExpected: TravelPlay[];
  };
  const testGetEatenPlay: testTravelPlay[] = [
    {
      position: new Position(0, 0),
      piece: pawnWhite,
      travelPlaysExpected: [],
    },
    {
      position: new Position(2, 0),
      piece: pawnWhite,
      travelPlaysExpected: [],
    },
    {
      position: new Position(1, 1),
      piece: pawnBlack,
      travelPlaysExpected: [],
    },
    {
      position: new Position(5, 1),
      piece: pawnWhite,
      travelPlaysExpected: [
        new TravelPlay(new Position(5, 1), new Position(6, 2)),
        new TravelPlay(new Position(5, 1), new Position(4, 2)),
      ],
    },
  ];
  const unitTestEatenPlay = ({
    position,
    piece,
    travelPlaysExpected,
  }: testTravelPlay) => {
    it(`should return [${travelPlaysExpected.map((travelPlay) =>
      travelPlay.toStr()
    )}] for ${JSON.stringify(piece.getJSON())} in ${position.toStr()}`, () =>
      expect(
        eatBoard.getPieceTravelPlays(piece, position)
      ).toIncludeSameMembers(travelPlaysExpected));
  };
  testGetEatenPlay.map(unitTestEatenPlay);
});
describe("test getPlayerPlays()", () => {
  it("if eatenPlays possible should return eatenPlays ", () => {
    eatBoard
      .getPlayerPlays(new Player(WHITE, TOP, "test"))
      .forEach((play) => expect(play instanceof EatenPlay).toBe(true));
  });
  it("if travelPlays possible should return travelPlays ", () => {
    startBoard
      .getPlayerPlays(new Player(WHITE, TOP, "test"))
      .forEach((play) => expect(play instanceof EatenPlay).toBe(false));
  });
});
