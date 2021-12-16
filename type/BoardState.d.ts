import Box from "./Box";
import { LengthType } from "./utils/type";
export declare type BoardState = LengthType<LengthType<Box>>;
export declare const EMPTY_BOARD: BoardState;
export declare const ONE_PAWN_BOARD: BoardState;
export declare const CLASSIC_BOARD: BoardState;
