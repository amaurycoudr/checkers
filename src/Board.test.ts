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
  const testGetEatenPlay: {
    position: Position;
    piece: Piece;
    eatenPlaysExpected: EatenPlay[];
  }[] = [
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
