export const INDEX_MIN = 0;
export const INDEX_MAX = 9;

export const BOX_TYPE = 'Box';
export const PAWN_TYPE = 'Pawn';
export const QUEEN_TYPE = 'Queen';

export type ContentType =
  | typeof BOX_TYPE
  | typeof PAWN_TYPE
  | typeof QUEEN_TYPE;
