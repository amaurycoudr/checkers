export const INDEX_MIN = 0;
export const INDEX_MAX = 9;

export const EMPTY_BOX_TYPE = 'Box';
export const PAWN_TYPE = 'Pawn';
export const QUEEN_TYPE = 'Queen';

export type PieceType = typeof PAWN_TYPE | typeof QUEEN_TYPE;

export type ContentType = typeof EMPTY_BOX_TYPE | PieceType;

export const BOARD_SIZE_DEFAULT = 10;
