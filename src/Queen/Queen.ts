import Pawn from "../Pawn/Pawn";
import { Color, MoveStr } from "../utils/type";

class Queen extends Pawn {
  type: string = "Queen";
  eatenMoves: MoveStr[] = [];
  travelMoves: MoveStr[] = [];
  constructor(color: Color) {
    super(color);
  }
}
export default Queen;
