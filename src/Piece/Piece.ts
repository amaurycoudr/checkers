import EatenPlay from '../EatenPlay/EatenPlay';
import { Utils } from '../genericInterface';
import PieceSituation from '../PieceSituation/PieceSituation';
import Coordinates from '../Position/Position';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ContentType } from '../utils/board';
import { Color, MoveStr, PieceJSON } from '../utils/type';

export default abstract class Piece implements Utils {
  color: Color;

  abstract travelMoves: MoveStr[];

  abstract eatenMoves: MoveStr[];

  abstract type: ContentType;

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
    position: Coordinates,
  ): EatenPlay[];

  abstract getTravelPlays(
    situation: PieceSituation,
    position: Coordinates,
  ): TravelPlay[];

  getJSON(): PieceJSON {
    return { type: this.type, player: this.color };
  }

  toStr(): string {
    return `${this.type} ${this.color}`;
  }
}
