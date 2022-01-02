import { methodTest, methodTestMap } from '../../test/utils';
import Board from '../Board/Board';
import {
  CLASSIC_BOARD,
  EAT_BOARD,
  ONE_WHITE_PAWN_BOARD,
} from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import { pawnBlack, pawnWhite } from '../Piece/Pawn/pawns';
import { A1, B2 } from '../Position/Coordinate/coordinates';
import TravelPlay from '../TravelPlay/TravelPlay';
import { WHITE } from '../utils/type';
import PlaysPossible from './PlaysPossible';

const eatPlays = new PlaysPossible(new Board(EAT_BOARD), WHITE);

const travelPlays = new PlaysPossible(new Board(CLASSIC_BOARD), WHITE);

const tonePawnPlays = new PlaysPossible(new Board(ONE_WHITE_PAWN_BOARD), WHITE);

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
      ),
      numberOfPieceEaten: 1,
    },
    {
      playsPossible: new PlaysPossible(
        new Board({ A1: pawnWhite, B2: pawnBlack, B4: pawnBlack }),
        WHITE,
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
      ),
      numberOfPieceEaten: 3,
    },
  ],
  getNumberOfEatenDescription,
  getNumberOfEatenExpect,
);
