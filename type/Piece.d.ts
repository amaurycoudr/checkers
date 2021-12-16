import Box from "./Box";
import Player from "./Player";
import { PieceJSON } from "./utils/type";
export default abstract class Piece extends Box {
    player: Player;
    constructor(player: Player);
    isNotEmpty(): boolean;
    isOpponent(otherPlayer: Player): boolean;
    /**@todo add real return type */
    abstract getEatenPlay(): [];
    /**@todo add real return type */
    abstract getTravelPlay(): [];
    abstract getJSON(): PieceJSON;
}
