import EatenPlay from "../EatenPlay/EatenPlay";
import Piece from "../Piece/Piece";
import PieceSituation from "../PieceSituation/PieceSituation";
import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { BoardContent, Color, MoveStr, PieceJSON, WHITE } from "../utils/type";

class Pawn extends Piece {
  type = "Pawn";
  travelMoves: MoveStr[];
  eatenMoves = EATEN_MOVES_SITUATION;
  secondEatenMoves = EATEN_MOVES_SITUATION;

  constructor(color: Color) {
    super(color);
    if (color !== WHITE) {
      this.travelMoves = TOP_TRAVEL_MOVES;
    } else {
      this.travelMoves = BOTTOM_TRAVEL_MOVES;
    }
  }
  getEatenPlays(situation: PieceSituation, position: Position): EatenPlay[] {
    const result: EatenPlay[] = [];

    EATEN_MOVES_COMBINATION.forEach((combination) => {
      if (
        situation.isOpponentPiece(combination.eaten, this.color) &&
        situation.isEmptyBox(combination.to)
      ) {
        result.push(
          EatenPlay.eatenPlayFromMove(
            position,
            combination.to,
            combination.eaten
          )
        );
      }
    });

    return result;
  }

  getTravelPlays(situation: PieceSituation, position: Position): TravelPlay[] {
    const result: TravelPlay[] = [];
    this.travelMoves.forEach((move) => {
      const box = situation.get()[move];

      if (situation.isEmptyBox(move)) {
        result.push(
          new TravelPlay(position, position.getArrivalPosition(move))
        );
      }
    });
    return result;
  }
  getJSON(): PieceJSON {
    return { type: this.type, player: this.color };
  }
  toStr(): string {
    return `${this.type} ${this.color}`;
  }
}

const EATEN_MOVES_SITUATION: MoveStr[] = [
  "-1.+1",
  "-2.+2",
  "+1.+1",
  "+2.+2",
  "+1.-1",
  "+2.-2",
  "-1.-1",
  "-2.-2",
];

const EATEN_MOVES_COMBINATION: { to: MoveStr; eaten: MoveStr }[] = [
  { eaten: "+1.+1", to: "+2.+2" },
  { eaten: "+1.-1", to: "+2.-2" },
  { eaten: "-1.+1", to: "-2.+2" },
  { eaten: "-1.-1", to: "-2.-2" },
];

const TOP_TRAVEL_MOVES: MoveStr[] = ["-1.-1", "+1.-1"];

const BOTTOM_TRAVEL_MOVES: MoveStr[] = ["-1.+1", "+1.+1"];

export default Pawn;
