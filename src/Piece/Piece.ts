import Box from "../Box/Box";
import TravelPlay from "../TravelPlay/TravelPlay";
import Player from "../Player/Player";
import Position from "../Position/Position";
import { MoveStr, PieceJSON, PieceSituation } from "../utils/type";
import EatenPlay from "../EatenPlay/EatenPlay";

export default abstract class Piece extends Box {
  protected player: Player;
  abstract travelMoves: MoveStr[];
  abstract eatenMoves: MoveStr[];
  hasBeenEaten: boolean;

  constructor(player: Player) {
    super();
    this.player = player;
    this.hasBeenEaten = false;
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
