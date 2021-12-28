import { map } from "lodash";
import BoxContent from "../BoxContent/BoxContent";
import EatenPlay from "../EatenPlay/EatenPlay";
import Pawn from "../Pawn/Pawn";
import Piece from "../Piece/Piece";
import PieceSituation, {
  PieceSituationType,
} from "../PieceSituation/PieceSituation";
import Player from "../Player/Player";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_OUT_OF_BOUND } from "../utils/error";
import { forBoard } from "../utils/fn";
import { BLACK, MoveStr, WHITE } from "../utils/type";
import Board from "./Board";
import {
  a1PawnBoard,
  CLASSIC_BOARD,
  EAT_BOARD,
  EMPTY_BOARD,
  ONE_WHITE_PAWN_BOARD,
  START_BOARD_JSON,
} from "./BoardState";

const emptyBoard = new Board(EMPTY_BOARD);
const emptyBoardBis = new Board(EMPTY_BOARD);
const onePawnBoard = new Board(ONE_WHITE_PAWN_BOARD);
const startBoard = new Board(CLASSIC_BOARD);
const eatBoard = new Board(EAT_BOARD);

methodTest(emptyBoard.getBox, () => {
  it("should be equal boardState[y][x] for Position(x,y)", () => {
    forBoard((position, x, y) => {
      expect(emptyBoard.getBox(position)).toBe(EMPTY_BOARD[y][x]);
    });
  });
  it("should throw an error if out of bound", () => {
    expect(() => emptyBoard.getBox(new Position(-1, -1))).toThrowError(
      ERROR_OUT_OF_BOUND
    );
  });
});

methodTest(emptyBoard.setBox, () => {
  it("should throw an error if out of bound", () => {
    expect(() =>
      emptyBoard.setBox(new Position(-1, -1), new BoxContent())
    ).toThrowError(ERROR_OUT_OF_BOUND);
  });
});

methodTest(emptyBoard.toStr, () => {
  it("should return START_BOARD_JSON for CLASSIC_BOARD", () => {
    expect(startBoard.toStr()).toStrictEqual(JSON.stringify(START_BOARD_JSON));
  });
});
methodTest(emptyBoard.equals, () => {
  it("should return false if it is a different board", () => {
    expect(emptyBoard.equals(onePawnBoard)).toBeFalse();
    expect(emptyBoard.equals(startBoard)).toBeFalse();
    expect(emptyBoard.equals(eatBoard)).toBeFalse();
  });

  it("should return true if it as the same boardState", () => {
    expect(emptyBoard.equals(emptyBoardBis)).toBeTrue();
  });
});

methodTest(emptyBoard.getJSON, () => {
  it("should return {} for EMPTY_BOARD", () => {
    expect(emptyBoard.getJSON()).toStrictEqual({});
  });
  const whitePawn = new Pawn(new Player(WHITE));
  it(`should return { A1: ${JSON.stringify(
    whitePawn.getJSON()
  )} } for ONE_PAWN_BOARD`, () => {
    expect(onePawnBoard.getJSON()).toStrictEqual({ A1: whitePawn.getJSON() });
  });

  it("should return START_BOARD_JSON for CLASSIC_BOARD", () => {
    expect(startBoard.getJSON()).toStrictEqual(START_BOARD_JSON);
  });
});

methodTest(startBoard.getAroundSituation, () => {
  type DataGetAroundSituation = {
    position: Position;
    moves: MoveStr[];
    expected: PieceSituationType;
  };

  const A1 = new Position(0, 0);
  const B1 = new Position(1, 0);
  const B2 = new Position(1, 1);

  const dataGetAroundSituation: DataGetAroundSituation[] = [
    {
      position: A1,
      moves: ["+1.+1"],
      expected: {
        "+1.+1": CLASSIC_BOARD[1][1],
      },
    },
    {
      position: A1,
      moves: ["-1.+1", "+1.+1"],
      expected: {
        "+1.+1": CLASSIC_BOARD[1][1],
      },
    },
    {
      position: A1,
      moves: ["-1.+1"],
      expected: {},
    },
    {
      position: B1,
      moves: ["-1.-1"],
      expected: {},
    },
    {
      position: B2,
      moves: ["-1.-1"],
      expected: { "-1.-1": CLASSIC_BOARD[0][0] },
    },
    {
      position: B2,
      moves: ["+1.+1", "-1.+1", "+1.-1"],
      expected: {
        "+1.+1": CLASSIC_BOARD[2][2],
        "-1.+1": CLASSIC_BOARD[2][0],
        "+1.-1": CLASSIC_BOARD[0][2],
      },
    },
  ];
  const unitTestGetAroundSituation = ({
    position,
    moves,
    expected,
  }: DataGetAroundSituation) => {
    it(`should return {${map(
      expected,
      (situation, move) => `${move}:${situation?.toStr()}, `
    )}} for position: ${position.toStr()}, Moves : ${moves.toString()}`, () => {
      expect(
        startBoard.getAroundSituation(position, moves).get()
      ).toStrictEqual(expected);
    });
  };
  dataGetAroundSituation.forEach(unitTestGetAroundSituation);
});

methodTest(eatBoard.getPieceEatenPlays, () => {
  const pawnWhite = new Pawn(new Player(WHITE));
  const pawnBlack = new Pawn(new Player(BLACK));
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
    )}] for ${piece.toStr()} in ${position.toStr()}`, () =>
      expect(eatBoard.getPieceEatenPlays(piece, position)).toIncludeSameMembers(
        eatenPlaysExpected
      ));
  };
  testGetEatenPlay.map(unitTestEatenPlay);
});

methodTest(emptyBoard.getPlayerPieces, () => {
  const whitePlayer = new Player(WHITE);
  const blackPlayer = new Player(BLACK);
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

methodTest(emptyBoard.getPieceTravelPlays, () => {
  const pawnWhite = new Pawn(new Player(WHITE));
  const pawnBlack = new Pawn(new Player(BLACK));
  type testTravelPlay = {
    position: Position;
    piece: Piece;
    travelPlaysExpected: TravelPlay[];
  };
  const dataGetEatenPlay: testTravelPlay[] = [
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
    )}] for ${piece.toStr()} in ${position.toStr()}`, () =>
      expect(
        eatBoard.getPieceTravelPlays(piece, position)
      ).toIncludeSameMembers(travelPlaysExpected));
  };
  dataGetEatenPlay.map(unitTestEatenPlay);
});
methodTest(eatBoard.getPlayerPlays, () => {
  it("should return eatenPlays if eatenPlays possible ", () => {
    eatBoard
      .getPlayerPlays(new Player(WHITE))
      .forEach((play) => expect(play instanceof EatenPlay).toBe(true));
  });
  it("should return travelPlays if only travelPlays possible", () => {
    startBoard
      .getPlayerPlays(new Player(WHITE))
      .forEach((play) => expect(play instanceof EatenPlay).toBe(false));
  });

  const move = new TravelPlay(new Position(0, 0), new Position(1, 1));
  it(`should return ${move.toStr()} for the onePawnBoard`, () => {
    expect(onePawnBoard.getPlayerPlays(new Player(WHITE))[0]).toStrictEqual(
      move
    );
  });
});

methodTest(eatBoard.getNewBoardFromPlay, () => {
  it("should return a board where from is a Box and to is Equal to from previous value", () => {
    const A1 = new Position(0, 0);
    const B2 = new Position(1, 1);
    const play = new TravelPlay(A1, B2);
    const newBoard = onePawnBoard.getNewBoardFromPlay(play);
    const box = new BoxContent();

    expect(newBoard.getBox(A1)).toStrictEqual(box);
    expect(newBoard.getBox(B2)).toStrictEqual(onePawnBoard.getBox(A1));
  });
  it("should return a board where from and eaten is a Box and to is Equal to from previous value", () => {
    const A1 = new Position(0, 0);
    const B2 = new Position(1, 1);
    const C3 = new Position(2, 2);
    const play = new EatenPlay(A1, C3, B2);
    const newBoard = eatBoard.getNewBoardFromPlay(play);
    const box = new BoxContent();

    expect(newBoard.getBox(A1)).toStrictEqual(box);
    expect(newBoard.getBox(B2)).toStrictEqual(box);
    expect(newBoard.getBox(C3)).toStrictEqual(eatBoard.getBox(A1));
  });
});
