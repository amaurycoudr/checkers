import EatenPlay from '../../EatenPlay/EatenPlay';
import PieceSituation from '../../PieceSituation/PieceSituation';
import Coordinate from '../../Position/Coordinate/Coordinate';
import TravelPlay from '../../TravelPlay/TravelPlay';
import { ContentType, PAWN_TYPE } from '../../utils/board';
import { Color, MoveStr, WHITE } from '../../utils/type';
import Piece from '../Piece';

const EATEN_MOVES_SITUATION: MoveStr[] = [
  '-1.+1',
  '-2.+2',
  '+1.+1',
  '+2.+2',
  '+1.-1',
  '+2.-2',
  '-1.-1',
  '-2.-2',
];

const EATEN_MOVES_COMBINATION: { to: MoveStr; eaten: MoveStr }[] = [
  { eaten: '+1.+1', to: '+2.+2' },
  { eaten: '+1.-1', to: '+2.-2' },
  { eaten: '-1.+1', to: '-2.+2' },
  { eaten: '-1.-1', to: '-2.-2' },
];

const TOP_TRAVEL_MOVES: MoveStr[] = ['-1.-1', '+1.-1'];

const BOTTOM_TRAVEL_MOVES: MoveStr[] = ['-1.+1', '+1.+1'];
class Pawn extends Piece {
  type: ContentType = PAWN_TYPE;

  travelMoves: MoveStr[];

  eatenMoves = EATEN_MOVES_SITUATION;

  constructor(color: Color) {
    super(color);
    if (color !== WHITE) {
      this.travelMoves = TOP_TRAVEL_MOVES;
    } else {
      this.travelMoves = BOTTOM_TRAVEL_MOVES;
    }
  }

  getEatenPlays(situation: PieceSituation, position: Coordinate): EatenPlay[] {
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
            combination.eaten,
          ),
        );
      }
    });

    return result;
  }

  getTravelPlays(
    situation: PieceSituation,
    position: Coordinate,
  ): TravelPlay[] {
    const result: TravelPlay[] = [];
    this.travelMoves.forEach((move) => {
      if (situation.isEmptyBox(move)) {
        result.push(
          new TravelPlay(position, position.getArrivalCoordinate(move)),
        );
      }
    });
    return result;
  }
}

export default Pawn;
