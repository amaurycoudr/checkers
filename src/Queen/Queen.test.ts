import { Position } from "..";
import EatenPlay from "../EatenPlay/EatenPlay";
import { box } from "../EmptyBox/emptyBoxes";
import { pawnBlack } from "../Pawn/pawns";
import PieceSituation from "../PieceSituation/PieceSituation";
import { A1, A10, B3, E4, J1, J10 } from "../Position/positions";
import { methodTest, methodTestMap } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { WHITE } from "../utils/type";
import Queen from "./Queen";
const queen = new Queen(WHITE);
methodTest(queen.getEatenPlays, () => {});
type DataTravelPlay = {
  queen: Queen;
  situation: PieceSituation;
  plays: TravelPlay[];
  position: Position;
};
const descriptionPlay = (data: DataTravelPlay) => {
  return `should return [${data.plays.map((play) =>
    play.toStr()
  )}] for SITUATION : ${data.situation.toStr()}, PIECE : ${data.queen.toStr()}, POSITION : ${data.position.toStr()} `;
};
const expectTravelPlays = (data: DataTravelPlay) => {
  expect(
    data.queen.getTravelPlays(data.situation, data.position)
  ).toIncludeSameMembers(data.plays);
};
methodTestMap<DataTravelPlay>(
  queen.getTravelPlays,
  [
    {
      position: A1,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "+1.+1": box,
        "+2.+2": box,
        "+3.+3": box,
        "+4.+4": box,
        "+5.+5": box,
      }),
      plays: [
        TravelPlay.fromMove(A1, "+1.+1"),
        TravelPlay.fromMove(A1, "+2.+2"),
        TravelPlay.fromMove(A1, "+3.+3"),
        TravelPlay.fromMove(A1, "+4.+4"),
        TravelPlay.fromMove(A1, "+5.+5"),
      ],
    },
    {
      position: A10,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "+1.-1": box,
        "+2.-2": box,
        "+3.-3": box,
        "+4.-4": box,
        "+5.-5": box,
      }),
      plays: [
        TravelPlay.fromMove(A10, "+1.-1"),
        TravelPlay.fromMove(A10, "+2.-2"),
        TravelPlay.fromMove(A10, "+3.-3"),
        TravelPlay.fromMove(A10, "+4.-4"),
        TravelPlay.fromMove(A10, "+5.-5"),
      ],
    },
    {
      position: J10,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "-1.-1": box,
        "-2.-2": box,
        "-3.-3": box,
        "-4.-4": box,
        "-5.-5": box,
      }),
      plays: [
        TravelPlay.fromMove(J10, "-1.-1"),
        TravelPlay.fromMove(J10, "-2.-2"),
        TravelPlay.fromMove(J10, "-3.-3"),
        TravelPlay.fromMove(J10, "-4.-4"),
        TravelPlay.fromMove(J10, "-5.-5"),
      ],
    },
    {
      position: J1,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "-1.+1": box,
        "-2.+2": box,
        "-3.+3": box,
        "-4.+4": box,
        "-5.+5": box,
      }),
      plays: [
        TravelPlay.fromMove(J1, "-1.+1"),
        TravelPlay.fromMove(J1, "-2.+2"),
        TravelPlay.fromMove(J1, "-3.+3"),
        TravelPlay.fromMove(J1, "-4.+4"),
        TravelPlay.fromMove(J1, "-5.+5"),
      ],
    },
  ],
  descriptionPlay,
  expectTravelPlays
);

const expectEatenPlays = (data: DataTravelPlay) => {
  expect(
    data.queen.getEatenPlays(data.situation, data.position)
  ).toIncludeSameMembers(data.plays);
};
methodTestMap<DataTravelPlay>(
  queen.getEatenPlays,
  [
    {
      position: A1,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "+1.+1": box,
        "+2.+2": box,
        "+3.+3": box,
        "+4.+4": pawnBlack,
        "+5.+5": box,
      }),
      plays: [EatenPlay.eatenPlayFromMove(A1, "+5.+5", "+4.+4")],
    },
    {
      position: A10,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "+1.-1": pawnBlack,
        "+2.-2": box,
        "+3.-3": box,
        "+4.-4": box,
        "+5.-5": box,
      }),
      plays: [EatenPlay.eatenPlayFromMove(A10, "+2.-2", "+1.-1")],
    },
    {
      position: J10,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "-1.-1": box,
        "-2.-2": box,
        "-3.-3": box,
        "-4.-4": box,
        "-5.-5": pawnBlack,
      }),
      plays: [],
    },
    {
      position: J1,
      queen: new Queen(WHITE),
      situation: new PieceSituation({
        "-1.+1": box,
        "-2.+2": box,
        "-3.+3": pawnBlack,
        "-4.+4": box,
        "-5.+5": box,
      }),
      plays: [EatenPlay.eatenPlayFromMove(J1, "-4.+4", "-3.+3")],
    },
  ],
  descriptionPlay,
  expectEatenPlays
);
