import Box from "./Box";
import Piece from "./Piece";
import TravelPlay from "./TravelPlay";
import Player from "./Player";
import Position from "./Position";
import { MoveStr, PieceJSON, PieceSituation } from "./utils/type";
import EatenPlay from "./EatenPlay";

class Pawn extends Piece {
  static type: string = "Pawn";
  travelMoves: MoveStr[];
  eatenMoves: MoveStr[] = [
    "-1.+1",
    "-2.+2",
    "+1.+1",
    "+2.+2",
    "+1.-1",
    "+2.-2",
    "-1.-1",
    "-2.-2",
  ];
  constructor(player: Player) {
    super(player);
    if (player.isTop()) {
      this.travelMoves = ["-1.-1", "+1.-1"];
    } else {
      this.travelMoves = ["+1.-1", "+1.+1"];
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
    console.log(situation, "_______");
    possibleMoves.forEach((moves) => {
      if (this.canBeEatenPlay(situation[moves[0]], situation[moves[1]])) {
        result.push(
          new EatenPlay(
            position,
            position.getArrivalPosition(Position.getPositionFromMove(moves[1])),
            position.getArrivalPosition(Position.getPositionFromMove(moves[0]))
          )
        );
      }
    });
    console.log(result, position);

    return result;
  }

  private canBeEatenPlay(
    near: Box | undefined,
    arrived: Box | undefined
  ): boolean {
    const isArrivedEmpty = arrived && !arrived.isNotEmpty();
    const isNearOpponent =
      near && near instanceof Piece && near.isOpponent(this.player);
    return !!isArrivedEmpty && !!isNearOpponent;
  }

  getTravelPlays(): [] {
    return [];
  }
  getJSON(): PieceJSON {
    return { type: Pawn.type, player: this.player.getColor() };
  }
}
export default Pawn;
