import EatenPlay from "../EatenPlay/EatenPlay";
import { Utils } from "../genericInterface";
import PieceSituation from "../PieceSituation/PieceSituation";
import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { Color, MoveStr, PieceJSON } from "../utils/type";

export default abstract class Piece implements Utils {
  color: Color;
  abstract travelMoves: MoveStr[];
  abstract eatenMoves: MoveStr[];
  abstract type: string;
  abstract secondEatenMoves: MoveStr[];
  hasBeenEaten: boolean;

  constructor(color: Color) {
    this.color = color;
    this.hasBeenEaten = false;
  }

  isOpponent(color: Color) {
    return color !== this.color;
  }

  equals(o: Piece): boolean {
    return !this.isOpponent(o.color) && o.type === this.type;
  }

  abstract getEatenPlays(
    situation: PieceSituation,
    position: Position
  ): EatenPlay[];

  abstract getTravelPlays(
    situation: PieceSituation,
    position: Position
  ): TravelPlay[];

  getJSON(): PieceJSON {
    return { type: this.type, player: this.color };
  }
  toStr(): string {
    return `${this.type} ${this.color}`;
  }
}
