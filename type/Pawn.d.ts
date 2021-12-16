import Piece from "./Piece";
import { PieceJSON } from "./utils/type";
declare class Pawn extends Piece {
    static type: string;
    getEatenPlay(): [];
    getTravelPlay(): [];
    getJSON(): PieceJSON;
}
export default Pawn;
