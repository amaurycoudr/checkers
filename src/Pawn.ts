import Box from "./Box";
import EatenPlay from "./EatenPlay";
import Piece from "./Piece";
import Player from "./Player";
import Position from "./Position";
import { MoveStr, PieceJSON, PieceSituation } from "./utils/type";

class Pawn extends Piece {
  static type = "Pawn";
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
