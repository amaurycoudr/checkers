import EmptyBox from '../EmptyBox/EmptyBox';
import Pawn from '../Piece/Pawn/Pawn';
import Piece from '../Piece/Piece';
import { BLACK, Color, LengthType, WHITE } from '../utils/type';

export type BoardContent = EmptyBox | Piece;
export type BoardState = LengthType<LengthType<BoardContent>>;

export const emptyLine = (): LengthType<BoardContent> => [
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
];
export const playerLine = (
  color: Color,
  isEven: boolean,
): LengthType<BoardContent> => [
  isEven ? new Pawn(color) : new EmptyBox(),
  isEven ? new EmptyBox() : new Pawn(color),
  isEven ? new Pawn(color) : new EmptyBox(),
  isEven ? new EmptyBox() : new Pawn(color),
  isEven ? new Pawn(color) : new EmptyBox(),
  isEven ? new EmptyBox() : new Pawn(color),
  isEven ? new Pawn(color) : new EmptyBox(),
  isEven ? new EmptyBox() : new Pawn(color),
  isEven ? new Pawn(color) : new EmptyBox(),
  isEven ? new EmptyBox() : new Pawn(color),
];
export const onePawnLine = (color: Color): LengthType<BoardContent> => [
  new Pawn(color),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
  new EmptyBox(),
];

export const EMPTY_BOARD: BoardState = [
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const ONE_WHITE_PAWN_BOARD: BoardState = [
  onePawnLine(WHITE),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];
export const CLASSIC_BOARD: BoardState = [
  playerLine(WHITE, true),
  playerLine(WHITE, false),
  playerLine(WHITE, true),
  playerLine(WHITE, false),
  emptyLine(),
  emptyLine(),
  playerLine(BLACK, true),
  playerLine(BLACK, false),
  playerLine(BLACK, true),
  playerLine(BLACK, false),
];

export const EAT_BOARD: BoardState = [
  playerLine(WHITE, true),
  playerLine(BLACK, false),
  emptyLine(),
  playerLine(WHITE, false),
  playerLine(BLACK, true),
  playerLine(WHITE, false),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const TWO_PLAY_BOARD: BoardState = [
  playerLine(WHITE, true),
  playerLine(BLACK, false),
  emptyLine(),
  playerLine(BLACK, false),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const QUEEN_WHITE_TEST: BoardState = [
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  playerLine(WHITE, true),
  emptyLine(),
];
export const QUEEN_BLACK_TEST: BoardState = [
  emptyLine(),
  playerLine(BLACK, true),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const a1PawnBoard = (player: Color): BoardState => [
  onePawnLine(player),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

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
export const START_BOARD_ARRAY = [
  [
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
  ],
  [
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
  ],
  [
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
  ],
];

export const ONE_PLAY_BOARD_ARRAY = [
  [
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
  ],
  [
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
    undefined,
    { player: 'white', type: 'Pawn' },
  ],
  [
    { player: 'white', type: 'Pawn' },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
  ],
  [
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
  ],
  [
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
    undefined,
    { player: 'black', type: 'Pawn' },
  ],
];
