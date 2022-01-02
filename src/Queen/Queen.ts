import { flatten } from 'lodash';
import EatenPlay from '../EatenPlay/EatenPlay';
import Pawn from '../Piece/Pawn/Pawn';
import PieceSituation from '../PieceSituation/PieceSituation';
import Coordinate from '../Position/Coordinate/Coordinate';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ContentType, QUEEN_TYPE } from '../utils/board';
import { moveCoordinate, MoveNumber, MoveStr } from '../utils/type';

type EatenCombination = {
  travel: MoveStr[];
  eat: MoveStr;
  arrived: MoveStr;
};

const NO_TRAVEL_EATEN_COMBINATION: EatenCombination[] = [
  { travel: [], eat: '+1.+1', arrived: '+2.+2' },
  { travel: [], eat: '-1.-1', arrived: '-2.-2' },
  { travel: [], eat: '+1.-1', arrived: '+2.-2' },
  { travel: [], eat: '-1.+1', arrived: '-2.+2' },
];

const moveDirections = ['+', '-'] as const;
const MOVES_SITUATION = flatten(
  flatten(
    moveDirections.map((directionX) =>
      moveDirections.map((directionY) =>
        moveCoordinate.map(
          (value): MoveStr => `${directionX}${value}.${directionY}${value}`,
        ),
      ),
    ),
  ),
);
const TRAVEL_MOVES_COMBINATION: MoveStr[][] = flatten(
  flatten(
    moveDirections.map((directionX) =>
      moveDirections.map((directionY) =>
        moveCoordinate.map((value) =>
          Array.from(
            { length: value },
            (_, index): MoveStr =>
              `${directionX}${(index + 1) as MoveNumber}.${directionY}${
                (index + 1) as MoveNumber
              }`,
          ),
        ),
      ),
    ),
  ),
);

const getNewMove = (travel: MoveStr, n: number) =>
  `${travel[0]}${parseInt(travel[1], 10) + n}.${travel[3]}${
    parseInt(travel[4], 10) + n
  }` as MoveStr;
const TRAVEL_EATEN_MOVES_COMBINATION: EatenCombination[] =
  TRAVEL_MOVES_COMBINATION.filter((travel) => travel.length < 8).map(
    (travel): EatenCombination => ({
      travel,
      eat: getNewMove(travel[travel.length - 1], 1),
      arrived: getNewMove(travel[travel.length - 1], 2),
    }),
  );

const EATEN_MOVES_COMBINATION: EatenCombination[] = [
  ...TRAVEL_EATEN_MOVES_COMBINATION,
  ...NO_TRAVEL_EATEN_COMBINATION,
];

class Queen extends Pawn {
  type: ContentType = QUEEN_TYPE;

  eatenMoves: MoveStr[] = MOVES_SITUATION;

  travelMoves: MoveStr[] = MOVES_SITUATION;

  private travelMovesCombination = TRAVEL_MOVES_COMBINATION;

  private eatenMovesCombination = EATEN_MOVES_COMBINATION;

  getTravelPlays(
    situation: PieceSituation,
    position: Coordinate,
  ): TravelPlay[] {
    const result: TravelPlay[] = [];

    this.travelMovesCombination.forEach((combination) => {
      if (combination.every((move) => situation.isEmptyBox(move))) {
        result.push(
          TravelPlay.fromMove(position, combination[combination.length - 1]),
        );
      }
    });
    return result;
  }

  getEatenPlays(situation: PieceSituation, position: Coordinate): EatenPlay[] {
    const result: EatenPlay[] = [];
    this.eatenMovesCombination.forEach(({ eat, arrived, travel }) => {
      if (
        travel.every((move) => situation.isEmptyBox(move)) &&
        situation.isOpponentPiece(eat, this.color) &&
        situation.isEmptyBox(arrived)
      ) {
        result.push(EatenPlay.eatenPlayFromMove(position, arrived, eat));
      }
    });
    return result;
  }
}

export default Queen;
