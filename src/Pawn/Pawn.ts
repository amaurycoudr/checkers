import Box from "../Box/Box";
import EatenPlay from "../EatenPlay/EatenPlay";
import Piece from "../Piece/Piece";
import Player from "../Player/Player";
import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { MoveStr, PieceJSON, PieceSituation } from "../utils/type";
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
      if (this.canBeEatenPlay(situation[moves[0]], situation[moves[1]])) {
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
    near: Box | undefined,
    arrived: Box | undefined
  ): boolean {
    const isArrivedEmpty = arrived && !arrived.isPiece();
    const isNearOpponent =
      near && near instanceof Piece && near.isOpponent(this.player);
    return !!isArrivedEmpty && !!isNearOpponent;
  }

  getTravelPlays(situation: PieceSituation, position: Position): TravelPlay[] {
    const result: TravelPlay[] = [];
    this.travelMoves.forEach((move) => {
      const box = situation[move];

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
export default Pawn;
