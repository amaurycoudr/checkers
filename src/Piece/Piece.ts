import EmptyBox from "../EmptyBox/EmptyBox";
import TravelPlay from "../TravelPlay/TravelPlay";
import Player from "../Player/Player";
import Position from "../Position/Position";
import { MoveStr, PieceJSON } from "../utils/type";
import EatenPlay from "../EatenPlay/EatenPlay";
import { Utils } from "../genericInterface";
import PieceSituation from "../PieceSituation/PieceSituation";

export default abstract class Piece implements Utils {
  protected player: Player;
  abstract travelMoves: MoveStr[];
  abstract eatenMoves: MoveStr[];
  abstract type: string;
  abstract secondEatenMoves: MoveStr[];
  hasBeenEaten: boolean;

  constructor(player: Player) {
    this.player = player;
    this.hasBeenEaten = false;
  }

  isOpponent(otherPlayer: Player) {
    return !otherPlayer.equals(this.player);
  }

  equals(o: Piece): boolean {
    return o.player.equals(this.player) && o.type === this.type;
  }

  abstract toStr(): string;

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
