import { BoardState } from "./BoardState";
import Box from "./Box";
import Position from "./Position";
import { Coordinates, PieceJSON } from "./utils/type";
declare type BoardJSON = {
    [key in Coordinates]?: PieceJSON;
};
declare class Board {
    private board;
    constructor(initBoard: BoardState);
    getBox(position: Position): Box;
    getJSON(): BoardJSON;
}
export default Board;
