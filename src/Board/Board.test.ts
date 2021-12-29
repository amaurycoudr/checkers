import { map } from "lodash";
import EatenPlay from "../EatenPlay/EatenPlay";
import EmptyBox from "../EmptyBox/EmptyBox";
import { pawnBlack, pawnWhite } from "../Piece/Pawn/pawns";
import Piece from "../Piece/Piece";
import { PieceSituationType } from "../PieceSituation/PieceSituation";
import Coordinates from "../Position/Coordinate/Coordinate";
import {
  A1,
  A2,
  A3,
  A7,
  A9,
  B1,
  B10,
  B2,
  B4,
  B6,
  C1,
  C3,
  C5,
  D2,
  D4,
  D6,
  E3,
  E7,
  F2,
  G3,
} from "../Position/coordinates";
import Queen from "../Queen/Queen";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_COORDINATE_OUT } from "../utils/error";
import { forBoard } from "../utils/fn";
import { BLACK, MoveStr, WHITE } from "../utils/type";
import Board from "./Board";
import {
  a1PawnBoard,
  CLASSIC_BOARD,
  EAT_BOARD,
  EMPTY_BOARD,
  ONE_WHITE_PAWN_BOARD,
  QUEEN_BLACK_TEST,
  QUEEN_WHITE_TEST,
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
      expect(startBoard.getBox(position)).toStrictEqual(CLASSIC_BOARD[y][x]);
    });
  });
  it("should throw an error if out of bound", () => {
    expect(() => emptyBoard.getBox(new Coordinates(-1, -1))).toThrowError(
      ERROR_COORDINATE_OUT
    );
  });
});

methodTest(emptyBoard.setBox, () => {
  it("should throw an error if out of bound", () => {
    expect(() =>
      emptyBoard.setBox(new Coordinates(-1, -1), new EmptyBox())
    ).toThrowError(ERROR_COORDINATE_OUT);
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

  it(`should return { A1: ${JSON.stringify(
    pawnWhite.getJSON()
  )} } for ONE_PAWN_BOARD`, () => {
    expect(onePawnBoard.getJSON()).toStrictEqual({ A1: pawnWhite.getJSON() });
  });

  it("should return START_BOARD_JSON for CLASSIC_BOARD", () => {
    expect(startBoard.getJSON()).toStrictEqual(START_BOARD_JSON);
  });
});

methodTest(startBoard.getAroundSituation, () => {
  type DataGetAroundSituation = {
    position: Coordinates;
    moves: MoveStr[];
    expected: PieceSituationType;
  };

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
  type testEatenPlay = {
    position: Coordinates;
    piece: Piece;
    eatenPlaysExpected: EatenPlay[];
  };
  const testGetEatenPlay: testEatenPlay[] = [
    {
      position: A1,
      piece: pawnWhite,
      eatenPlaysExpected: [new EatenPlay(A1, C3, B2)],
    },
    {
      position: C1,
      piece: pawnWhite,
      eatenPlaysExpected: [
        new EatenPlay(C1, A3, B2),
        new EatenPlay(C1, E3, D2),
      ],
    },
    {
      position: B2,
      piece: pawnBlack,
      eatenPlaysExpected: [],
    },
    {
      position: C5,
      piece: pawnBlack,
      eatenPlaysExpected: [
        new EatenPlay(C5, A3, B4),
        new EatenPlay(C5, E3, D4),
        new EatenPlay(C5, E7, D6),
        new EatenPlay(C5, A7, B6),
      ],
    },
  ];
  const unitTestEatenPlay = ({
    position,
    piece,
    eatenPlaysExpected,
  }: {
    position: Coordinates;
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
  const a1WhitePawnBoard = new Board(a1PawnBoard(WHITE));
  it("should return {} for emptyBoard", () => {
    expect(emptyBoard.getPlayerPieces(WHITE)).toStrictEqual({});
  });
  it(`should return {a1:Pawn} for whitePlayer a1WhitePawnBoard`, () => {
    expect(a1WhitePawnBoard.getPlayerPieces(WHITE)).toStrictEqual({
      A1: pawnWhite,
    });
  });

  it(`should return {} for blackPlayer a1WhitePawnBoard`, () => {
    expect(a1WhitePawnBoard.getPlayerPieces(BLACK)).toStrictEqual({});
  });
});

methodTest(emptyBoard.getPieceTravelPlays, () => {
  type testTravelPlay = {
    position: Coordinates;
    piece: Piece;
    travelPlaysExpected: TravelPlay[];
  };
  const dataGetEatenPlay: testTravelPlay[] = [
    {
      position: A1,
      piece: pawnWhite,
      travelPlaysExpected: [],
    },
    {
      position: C1,
      piece: pawnWhite,
      travelPlaysExpected: [],
    },
    {
      position: B2,
      piece: pawnBlack,
      travelPlaysExpected: [],
    },
    {
      position: F2,
      piece: pawnWhite,
      travelPlaysExpected: [new TravelPlay(F2, G3), new TravelPlay(F2, E3)],
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
      .getPlayerPlays(WHITE)
      .forEach((play) => expect(play instanceof EatenPlay).toBe(true));
  });
  it("should return travelPlays if only travelPlays possible", () => {
    startBoard
      .getPlayerPlays(WHITE)
      .forEach((play) => expect(play instanceof EatenPlay).toBe(false));
  });

  const move = new TravelPlay(A1, B2);
  it(`should return ${move.toStr()} for the onePawnBoard`, () => {
    expect(onePawnBoard.getPlayerPlays(WHITE)[0]).toStrictEqual(move);
  });
});

methodTest(eatBoard.getNewBoardFromPlay, () => {
  it("should return a board where FROM is a Box and TO is Equal to FROM previous value", () => {
    const play = new TravelPlay(A1, B2);
    const newBoard = onePawnBoard.getNewBoardFromPlay(play);
    const box = new EmptyBox();

    expect(newBoard.getBox(A1)).toStrictEqual(box);
    expect(newBoard.getBox(B2)).toStrictEqual(onePawnBoard.getBox(A1));
  });
  it("should return a board where FROM and EATEN is a Box and TO is Equal to FROM previous value", () => {
    const play = new EatenPlay(A1, C3, B2);
    const newBoard = eatBoard.getNewBoardFromPlay(play);
    const box = new EmptyBox();

    expect(newBoard.getBox(A1)).toStrictEqual(box);
    expect(newBoard.getBox(B2)).toStrictEqual(box);
    expect(newBoard.getBox(C3)).toStrictEqual(eatBoard.getBox(A1));
  });

  const previousWhiteQueenBoard = new Board(QUEEN_WHITE_TEST);
  const queenWhiteBoard = previousWhiteQueenBoard.getNewBoardFromPlay(
    new TravelPlay(A9, B10)
  );
  const previousBlackQueenBoard = new Board(QUEEN_BLACK_TEST);
  const queenBlackBoard = previousBlackQueenBoard.getNewBoardFromPlay(
    new TravelPlay(A2, B1)
  );
  it("should return a board white a queen", () => {
    expect(queenBlackBoard.getBox(B1) instanceof Queen).toBeTrue();
    expect(queenWhiteBoard.getBox(B10) instanceof Queen).toBeTrue();
  });
});
