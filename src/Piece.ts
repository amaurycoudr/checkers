import Box from "./Box";
import TravelPlay from "./TravelPlay";
import Player from "./Player";
import Position from "./Position";
import { MoveStr, PieceJSON, PieceSituation } from "./utils/type";
import EatenPlay from "./EatenPlay";

export default abstract class Piece extends Box {
  player: Player;
  abstract travelMoves: MoveStr[];
  abstract eatenMoves: MoveStr[];

  constructor(player: Player) {
    super();
    this.player = player;
  }
  isNotEmpty(): boolean {
    return true;
  }

  isOpponent(otherPlayer: Player) {
    return !otherPlayer.equals(this.player);
  }

  abstract getEatenPlays(
    situation: PieceSituation,
    position: Position
  ): EatenPlay[];

  abstract getTravelPlays(
    situation: PieceSituation,
    position: Position
  ): TravelPlay[];

  abstract getJSON(): PieceJSON;
}
