import BoxContent from "../BoxContent/BoxContent";
import TravelPlay from "../TravelPlay/TravelPlay";
import Player from "../Player/Player";
import Position from "../Position/Position";
import { MoveStr, PieceJSON } from "../utils/type";
import EatenPlay from "../EatenPlay/EatenPlay";
import { Utils } from "../genericInterface";
import PieceSituation from "../PieceSituation/PieceSituation";

export default abstract class Piece extends BoxContent implements Utils {
  protected player: Player;
  abstract travelMoves: MoveStr[];
  abstract eatenMoves: MoveStr[];
  abstract secondEatenMoves: MoveStr[];
  hasBeenEaten: boolean;

  constructor(player: Player) {
    super();
    this.player = player;
    this.hasBeenEaten = false;
  }
  isPiece(): boolean {
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
