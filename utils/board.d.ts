export declare const INDEX_MIN = 0;
export declare const INDEX_MAX = 9;
export declare const EMPTY_BOX_TYPE = "Box";
export declare const PAWN_TYPE = "Pawn";
export declare const QUEEN_TYPE = "Queen";
export declare type PieceType = typeof PAWN_TYPE | typeof QUEEN_TYPE;
export declare type ContentType = typeof EMPTY_BOX_TYPE | PieceType;
export declare const BOARD_SIZE_DEFAULT = 10;
