import { methodTest, methodTestMap } from '../../test/utils';
import Board from '../Board/Board';
import {
  CLASSIC_BOARD,
  EAT_BOARD,
  ONE_WHITE_PAWN_BOARD,
} from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import { pawnBlack, pawnWhite } from '../Piece/Pawn/pawns';
import { A1, A3, B2, C1, D2, E3 } from '../Position/Coordinate/coordinates';
import TravelPlay from '../TravelPlay/TravelPlay';
import { WHITE } from '../utils/type';
import PlaysPossible from './PlaysPossible';

const eatPlays = new PlaysPossible(new Board(EAT_BOARD), WHITE, true);

const travelPlays = new PlaysPossible(new Board(CLASSIC_BOARD), WHITE, true);

const tonePawnPlays = new PlaysPossible(
  new Board(ONE_WHITE_PAWN_BOARD),
  WHITE,
  true,
);

const move = new TravelPlay(A1, B2);

methodTest(eatPlays.getPlayerPlays, () => {
  it('should return eatenPlays if eatenPlays possible ', () => {
    eatPlays
      .getPlayerPlays()
      .forEach((play) => expect(play instanceof EatenPlay).toBe(true));
  });
  it('should return travelPlays if only travelPlays possible', () => {
    travelPlays
      .getPlayerPlays()
      .forEach((play) => expect(play instanceof EatenPlay).toBe(false));
  });

  it(`should return ${move.toStr()} for the onePawnBoard`, () => {
    expect(tonePawnPlays.getPlayerPlays()[0]).toStrictEqual(move);
  });
});

type GetPlayerPlaysData = {
  playsPossible: PlaysPossible;
  playerPlaysExpected: TravelPlay[];
};

const getPlayerPlaysExpect = (data: GetPlayerPlaysData) => {
  expect(data.playsPossible.getPlayerPlays()).toIncludeSameMembers(
    data.playerPlaysExpected,
  );
};
const getPlayerPlaysDescription = (data: GetPlayerPlaysData) => {
  const playsStr = `[${data.playerPlaysExpected.map((play) => play.toStr())}]`;
  return `should return ${playsStr} for BOARD: ${data.playsPossible.board.toStr()} and shouldCatchPiecesMaximum: ${
    data.playsPossible.shouldCatchPiecesMaximum
  }`;
};

methodTestMap(
  eatPlays.getPlayerPlays,
  [
    {
      playsPossible: new PlaysPossible(
        new Board({
          C1: pawnWhite,
          B2: pawnBlack,
          D2: pawnBlack,
          B4: pawnBlack,
        }),
        WHITE,
        true,
      ),
      playerPlaysExpected: [new EatenPlay(C1, A3, B2)],
    },
    {
      playsPossible: new PlaysPossible(
        new Board({
          C1: pawnWhite,
          B2: pawnBlack,
          D2: pawnBlack,
          B4: pawnBlack,
        }),
        WHITE,
        false,
      ),
      playerPlaysExpected: [
        new EatenPlay(C1, A3, B2),
        new EatenPlay(C1, E3, D2),
      ],
    },
    {
      playsPossible: new PlaysPossible(
        new Board({
          C1: pawnWhite,
          B2: pawnBlack,
          D2: pawnBlack,
          B4: pawnBlack,
        }),
        WHITE,
        true,
        C1,
      ),
      playerPlaysExpected: [new EatenPlay(C1, A3, B2)],
    },
    {
      playsPossible: new PlaysPossible(
        new Board({
          C1: pawnWhite,
          B2: pawnBlack,
          D2: pawnBlack,
          B4: pawnBlack,
        }),
        WHITE,
        false,
        C1,
      ),
      playerPlaysExpected: [
        new EatenPlay(C1, A3, B2),
        new EatenPlay(C1, E3, D2),
      ],
    },
  ],
  getPlayerPlaysDescription,
  getPlayerPlaysExpect,
);
type GetNumberOfEatenPieceData = {
  playsPossible: PlaysPossible;
  numberOfPieceEaten: number;
};
const getNumberOfEatenExpect = (data: GetNumberOfEatenPieceData) => {
  expect(
    data.playsPossible.getNumberOfEatenPiece(
      data.playsPossible.getPlayerPlays()[0],
    ),
  ).toBe(data.numberOfPieceEaten);
};
const getNumberOfEatenDescription = (data: GetNumberOfEatenPieceData) =>
  `should return ${
    data.numberOfPieceEaten
  } for the play of this board ${data.playsPossible.board.toStr()}`;

methodTestMap(
  eatPlays.getNumberOfEatenPiece,
  [
    {
      playsPossible: new PlaysPossible(
        new Board({ A1: pawnWhite, B2: pawnBlack }),
        WHITE,
        true,
      ),
      numberOfPieceEaten: 1,
    },
    {
      playsPossible: new PlaysPossible(
        new Board({ A1: pawnWhite, B2: pawnBlack, B4: pawnBlack }),
        WHITE,
        true,
      ),
      numberOfPieceEaten: 2,
    },
    {
      playsPossible: new PlaysPossible(
        new Board({
          A1: pawnWhite,
          B2: pawnBlack,
          B4: pawnBlack,
          B6: pawnBlack,
        }),
        WHITE,
        true,
      ),
      numberOfPieceEaten: 3,
    },
  ],
  getNumberOfEatenDescription,
  getNumberOfEatenExpect,
);
