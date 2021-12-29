import { Position } from "..";
import { box } from "../EmptyBox/emptyBoxes";
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
const expectTravelPlays = (data: DataTravelPlay) => {
  expect(
    data.queen.getTravelPlays(data.situation, data.position)
  ).toIncludeSameMembers(data.plays);
};
const descriptionPlay = (data: DataTravelPlay) => {
  return `should return [${data.plays.map((play) =>
    play.toStr()
  )}] for SITUATION : ${data.situation.toStr()}, PIECE : ${data.queen.toStr()}, POSITION : ${data.position.toStr()} `;
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
