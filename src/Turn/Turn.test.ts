import { methodTest, methodTestMap } from '../test/utils';
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
import { BLACK, WHITE } from '../utils/type';
import PartySituation from './Turn';

const eatPlays = new PartySituation(new Board(EAT_BOARD), WHITE, true);

const travelPlays = new PartySituation(new Board(CLASSIC_BOARD), WHITE, true);

const tonePawnPlays = new PartySituation(
  new Board(ONE_WHITE_PAWN_BOARD),
  WHITE,
  true,
);

const move = new TravelPlay(A1, B2);

methodTest(eatPlays.getPlayerPlays, () => {
  it('should return eatenPlays if eatenPlays possible', () => {
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
  playsPossible: PartySituation;
  playerPlaysExpected: TravelPlay[];
};

const getPlayerPlaysExpect = (data: GetPlayerPlaysData) => {
  expect(data.playsPossible.getPlayerPlays()).toIncludeSameMembers(
    data.playerPlaysExpected,
  );
};
const getPlayerPlaysDescription = (data: GetPlayerPlaysData) => {
  const playsStr = `[${data.playerPlaysExpected.map((play) => play.toStr())}]`;
  return `should return ${playsStr} for BOARD: ${data.playsPossible
    .getBoard()
    .toStr()} and shouldCatchPiecesMaximum: ${
    data.playsPossible.shouldCatchPiecesMaximum
  }`;
};

methodTestMap(
  eatPlays.getPlayerPlays,
  [
    {
      playsPossible: new PartySituation(
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
      playsPossible: new PartySituation(
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
      playsPossible: new PartySituation(
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
      playsPossible: new PartySituation(
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
  playsPossible: PartySituation;
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
  } for the play of this board ${data.playsPossible.getBoard().toStr()}`;

methodTestMap(
  eatPlays.getNumberOfEatenPiece,
  [
    {
      playsPossible: new PartySituation(
        new Board({ A1: pawnWhite, B2: pawnBlack }),
        WHITE,
        true,
      ),
      numberOfPieceEaten: 1,
    },
    {
      playsPossible: new PartySituation(
        new Board({ A1: pawnWhite, B2: pawnBlack, B4: pawnBlack }),
        WHITE,
        true,
      ),
      numberOfPieceEaten: 2,
    },
    {
      playsPossible: new PartySituation(
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

methodTest(eatPlays.makePlay, () => {
  it('should return newSituation.getPlayerTurn=BLACK if white player make a travel play ', () => {
    const initialPlaySituation = new PartySituation(
      new Board({ A1: pawnWhite, C3: pawnBlack }),
      WHITE,
      true,
    );
    const { newSituation } = initialPlaySituation.makePlay(
      new TravelPlay(A1, B2),
    );

    expect(newSituation.getPlayerTurn()).toBe(BLACK);
  });
});
