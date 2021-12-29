import { flatten } from "lodash";
import EatenPlay from "../EatenPlay/EatenPlay";
import PieceSituation from "../PieceSituation/PieceSituation";
import Coordinate from "../Position/Coordinate/Coordinate";
import TravelPlay from "../TravelPlay/TravelPlay";
import { Color, moveCoordinate, MoveNumber, MoveStr } from "../utils/type";
import Pawn from "../Piece/Pawn/Pawn";

class Queen extends Pawn {
  type: string = "Queen";
  eatenMoves: MoveStr[] = MOVES_SITUATION;
  travelMoves: MoveStr[] = MOVES_SITUATION;
  constructor(color: Color) {
    super(color);
  }
  getTravelPlays(
    situation: PieceSituation,
    position: Coordinate
  ): TravelPlay[] {
    const result: TravelPlay[] = [];

    TRAVEL_MOVES_COMBINATION.forEach((combination) => {
      if (combination.every((move) => situation.isEmptyBox(move))) {
        result.push(
          TravelPlay.fromMove(position, combination[combination.length - 1])
        );
      }
    });
    return result;
  }

  getEatenPlays(situation: PieceSituation, position: Coordinate): EatenPlay[] {
    const result: EatenPlay[] = [];
    EATEN_MOVES_COMBINATION.forEach(({ eat, arrived, travel }) => {
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

const moveDirections = ["+", "-"] as const;
const MOVES_SITUATION = flatten(
  flatten(
    moveDirections.map((directionX) =>
      moveDirections.map((directionY) =>
        moveCoordinate.map(
          (value): MoveStr => `${directionX}${value}.${directionY}${value}`
        )
      )
    )
  )
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
              }`
          )
        )
      )
    )
  )
);
type EatenCombination = {
  travel: MoveStr[];
  eat: MoveStr;
  arrived: MoveStr;
};
const NO_TRAVEL_EATEN_COMBINATION: EatenCombination[] = [
  { travel: [], eat: "+1.+1", arrived: "+2.+2" },
  { travel: [], eat: "-1.-1", arrived: "-2.-2" },
  { travel: [], eat: "+1.-1", arrived: "+2.-2" },
  { travel: [], eat: "-1.+1", arrived: "-2.+2" },
];
const TRAVEL_EATEN_MOVES_COMBINATION: EatenCombination[] =
  TRAVEL_MOVES_COMBINATION.filter((travel) => travel.length < 8).map(
    (travel): EatenCombination => ({
      travel,
      eat: (travel[travel.length - 1][0] +
        (parseInt(travel[travel.length - 1][1]) + 1) +
        "." +
        travel[travel.length - 1][3] +
        (parseInt(travel[travel.length - 1][4]) + 1)) as MoveStr,
      arrived: (travel[travel.length - 1][0] +
        (parseInt(travel[travel.length - 1][1]) + 2) +
        "." +
        travel[travel.length - 1][3] +
        (parseInt(travel[travel.length - 1][4]) + 2)) as MoveStr,
    })
  );

const EATEN_MOVES_COMBINATION: EatenCombination[] = [
  ...TRAVEL_EATEN_MOVES_COMBINATION,
  ...NO_TRAVEL_EATEN_COMBINATION,
];

export default Queen;
