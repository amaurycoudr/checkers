import EmptyBox from '../EmptyBox/EmptyBox';
import { pawnBlack, pawnWhite } from '../Piece/Pawn/pawns';
import Piece from '../Piece/Piece';
import { CoordinatesStr } from '../utils/type';

export type BoardContent = EmptyBox | Piece;

export type BoardState = { [key in CoordinatesStr]?: Piece };

export const EMPTY_BOARD: BoardState = {};

export const ONE_WHITE_PAWN_BOARD: BoardState = { A1: pawnWhite };
export const CLASSIC_BOARD = {
  A1: pawnWhite,
  C1: pawnWhite,
  E1: pawnWhite,
  G1: pawnWhite,
  I1: pawnWhite,
  B2: pawnWhite,
  D2: pawnWhite,
  F2: pawnWhite,
  H2: pawnWhite,
  J2: pawnWhite,
  A3: pawnWhite,
  C3: pawnWhite,
  E3: pawnWhite,
  G3: pawnWhite,
  I3: pawnWhite,
  B4: pawnWhite,
  D4: pawnWhite,
  F4: pawnWhite,
  H4: pawnWhite,
  J4: pawnWhite,
  A7: pawnBlack,
  C7: pawnBlack,
  E7: pawnBlack,
  G7: pawnBlack,
  I7: pawnBlack,
  B8: pawnBlack,
  D8: pawnBlack,
  F8: pawnBlack,
  H8: pawnBlack,
  J8: pawnBlack,
  A9: pawnBlack,
  C9: pawnBlack,
  E9: pawnBlack,
  G9: pawnBlack,
  I9: pawnBlack,
  B10: pawnBlack,
  D10: pawnBlack,
  F10: pawnBlack,
  H10: pawnBlack,
  J10: pawnBlack,
} as const;

export const EAT_BOARD: BoardState = {
  A1: pawnWhite,
  C1: pawnWhite,
  E1: pawnWhite,
  G1: pawnWhite,
  I1: pawnWhite,
  B2: pawnBlack,
  D2: pawnBlack,
  F2: pawnBlack,
  H2: pawnBlack,
  J2: pawnBlack,
  B4: pawnWhite,
  D4: pawnWhite,
  F4: pawnWhite,
  H4: pawnWhite,
  J4: pawnWhite,
  A5: pawnBlack,
  C5: pawnBlack,
  E5: pawnBlack,
  G5: pawnBlack,
  I5: pawnBlack,
  B6: pawnWhite,
  D6: pawnWhite,
  F6: pawnWhite,
  H6: pawnWhite,
  J6: pawnWhite,
};

export const TWO_PLAY_BOARD: BoardState = {
  A1: pawnWhite,
  B2: pawnBlack,
  B4: pawnBlack,
  D4: pawnBlack,
};

export const QUEEN_WHITE_TEST: BoardState = {
  A9: pawnWhite,
  C9: pawnWhite,
  E9: pawnWhite,
  G9: pawnWhite,
  I9: pawnWhite,
};
export const QUEEN_BLACK_TEST: BoardState = {
  A2: pawnBlack,
  C2: pawnBlack,
  E2: pawnBlack,
  G2: pawnBlack,
  I2: pawnBlack,
};

export const START_BOARD_JSON = {
  A1: { type: 'Pawn', player: 'white' },
  C1: { type: 'Pawn', player: 'white' },
  E1: { type: 'Pawn', player: 'white' },
  G1: { type: 'Pawn', player: 'white' },
  I1: { type: 'Pawn', player: 'white' },
  B2: { type: 'Pawn', player: 'white' },
  D2: { type: 'Pawn', player: 'white' },
  F2: { type: 'Pawn', player: 'white' },
  H2: { type: 'Pawn', player: 'white' },
  J2: { type: 'Pawn', player: 'white' },
  A3: { type: 'Pawn', player: 'white' },
  C3: { type: 'Pawn', player: 'white' },
  E3: { type: 'Pawn', player: 'white' },
  G3: { type: 'Pawn', player: 'white' },
  I3: { type: 'Pawn', player: 'white' },
  B4: { type: 'Pawn', player: 'white' },
  D4: { type: 'Pawn', player: 'white' },
  F4: { type: 'Pawn', player: 'white' },
  H4: { type: 'Pawn', player: 'white' },
  J4: { type: 'Pawn', player: 'white' },
  A7: { type: 'Pawn', player: 'black' },
  C7: { type: 'Pawn', player: 'black' },
  E7: { type: 'Pawn', player: 'black' },
  G7: { type: 'Pawn', player: 'black' },
  I7: { type: 'Pawn', player: 'black' },
  B8: { type: 'Pawn', player: 'black' },
  D8: { type: 'Pawn', player: 'black' },
  F8: { type: 'Pawn', player: 'black' },
  H8: { type: 'Pawn', player: 'black' },
  J8: { type: 'Pawn', player: 'black' },
  A9: { type: 'Pawn', player: 'black' },
  C9: { type: 'Pawn', player: 'black' },
  E9: { type: 'Pawn', player: 'black' },
  G9: { type: 'Pawn', player: 'black' },
  I9: { type: 'Pawn', player: 'black' },
  B10: { type: 'Pawn', player: 'black' },
  D10: { type: 'Pawn', player: 'black' },
  F10: { type: 'Pawn', player: 'black' },
  H10: { type: 'Pawn', player: 'black' },
  J10: { type: 'Pawn', player: 'black' },
};
export const ONE_PLAY_BOARD_JSON = {
  A1: { type: 'Pawn', player: 'white' },
  C1: { type: 'Pawn', player: 'white' },
  E1: { type: 'Pawn', player: 'white' },
  G1: { type: 'Pawn', player: 'white' },
  I1: { type: 'Pawn', player: 'white' },
  B2: { type: 'Pawn', player: 'white' },
  D2: { type: 'Pawn', player: 'white' },
  F2: { type: 'Pawn', player: 'white' },
  H2: { type: 'Pawn', player: 'white' },
  J2: { type: 'Pawn', player: 'white' },
  A3: { type: 'Pawn', player: 'white' },
  C3: { type: 'Pawn', player: 'white' },
  E3: { type: 'Pawn', player: 'white' },
  G3: { type: 'Pawn', player: 'white' },
  I3: { type: 'Pawn', player: 'white' },
  A5: { type: 'Pawn', player: 'white' },
  D4: { type: 'Pawn', player: 'white' },
  F4: { type: 'Pawn', player: 'white' },
  H4: { type: 'Pawn', player: 'white' },
  J4: { type: 'Pawn', player: 'white' },
  A7: { type: 'Pawn', player: 'black' },
  C7: { type: 'Pawn', player: 'black' },
  E7: { type: 'Pawn', player: 'black' },
  G7: { type: 'Pawn', player: 'black' },
  I7: { type: 'Pawn', player: 'black' },
  B8: { type: 'Pawn', player: 'black' },
  D8: { type: 'Pawn', player: 'black' },
  F8: { type: 'Pawn', player: 'black' },
  H8: { type: 'Pawn', player: 'black' },
  J8: { type: 'Pawn', player: 'black' },
  A9: { type: 'Pawn', player: 'black' },
  C9: { type: 'Pawn', player: 'black' },
  E9: { type: 'Pawn', player: 'black' },
  G9: { type: 'Pawn', player: 'black' },
  I9: { type: 'Pawn', player: 'black' },
  B10: { type: 'Pawn', player: 'black' },
  D10: { type: 'Pawn', player: 'black' },
  F10: { type: 'Pawn', player: 'black' },
  H10: { type: 'Pawn', player: 'black' },
  J10: { type: 'Pawn', player: 'black' },
};
