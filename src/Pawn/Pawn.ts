import BoxContent from "../BoxContent/BoxContent";
import EatenPlay from "../EatenPlay/EatenPlay";
import Piece from "../Piece/Piece";
import PieceSituation from "../PieceSituation/PieceSituation";
import Player from "../Player/Player";
import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { MoveStr, PieceJSON } from "../utils/type";

class Pawn extends Piece {
  static type = "Pawn";
  travelMoves: MoveStr[];
  eatenMoves = EATEN_MOVES_SITUATION;
  secondEatenMoves = EATEN_MOVES_SITUATION;

  constructor(player: Player) {
    super(player);
    if (player.isTop()) {
      this.travelMoves = TOP_TRAVEL_MOVES;
    } else {
      this.travelMoves = BOTTOM_TRAVEL_MOVES;
    }
  }
  getEatenPlays(situation: PieceSituation, position: Position): EatenPlay[] {
    const result: EatenPlay[] = [];

    EATEN_MOVES_COMBINATION.forEach((combination) => {
      if (
        this.canBeEatenPlay(
          situation.get()[combination.eaten],
          situation.get()[combination.to]
        )
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

  private canBeEatenPlay(
    eaten: BoxContent | undefined,
    to: BoxContent | undefined
  ): boolean {
    const isArrivedEmpty = to && !to.isPiece();
    const isNearOpponent =
      eaten && eaten instanceof Piece && eaten.isOpponent(this.player);
    return !!isArrivedEmpty && !!isNearOpponent;
  }

  getTravelPlays(situation: PieceSituation, position: Position): TravelPlay[] {
    const result: TravelPlay[] = [];
    this.travelMoves.forEach((move) => {
      const box = situation.get()[move];

      if (box && !box.isPiece()) {
        result.push(
          new TravelPlay(position, position.getArrivalPosition(move))
        );
      }
    });
    return result;
  }
  getJSON(): PieceJSON {
    return { type: Pawn.type, player: this.player.getColor() };
  }
  toStr(): string {
    return `${Pawn.type} ${this.player.getColor()}`;
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
