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
  eatenMoves = EATEN_MOVES;
  secondEatenMoves = EATEN_MOVES;

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

    const possibleMoves: MoveStr[][] = [
      ["+1.+1", "+2.+2"],
      ["+1.-1", "+2.-2"],
      ["-1.+1", "-2.+2"],
      ["-1.-1", "-2.-2"],
    ];

    possibleMoves.forEach((moves) => {
      if (
        this.canBeEatenPlay(
          situation.get()[moves[0]],
          situation.get()[moves[1]]
        )
      ) {
        result.push(
          new EatenPlay(
            position,
            position.getArrivalPosition(moves[1]),
            position.getArrivalPosition(moves[0])
          )
        );
      }
    });

    return result;
  }

  private canBeEatenPlay(
    near: BoxContent | undefined,
    arrived: BoxContent | undefined
  ): boolean {
    const isArrivedEmpty = arrived && !arrived.isPiece();
    const isNearOpponent =
      near && near instanceof Piece && near.isOpponent(this.player);
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

const EATEN_MOVES: MoveStr[] = [
  "-1.+1",
  "-2.+2",
  "+1.+1",
  "+2.+2",
  "+1.-1",
  "+2.-2",
  "-1.-1",
  "-2.-2",
];
const TOP_TRAVEL_MOVES: MoveStr[] = ["-1.-1", "+1.-1"];

const BOTTOM_TRAVEL_MOVES: MoveStr[] = ["-1.+1", "+1.+1"];

export default Pawn;
