import { map } from "lodash";
import { box } from "../Box/boxes";
import EatenPlay from "../EatenPlay/EatenPlay";
import { D4 } from "../Position/positions";
import { methodTest } from "../test/utils";

import TravelPlay from "../TravelPlay/TravelPlay";
import { PieceSituation, WHITE } from "../utils/type";
import Pawn from "./Pawn";
import { pawnBlack, pawnWhite } from "./pawns";

methodTest(pawnWhite.getJSON, () => {
  it(`should return {type:"Pawn, player:${WHITE}} for pawnWhite.getJSON()`, () => {
    expect(pawnWhite.getJSON().player).toBe(WHITE);
    expect(pawnWhite.getJSON().type).toBe(Pawn.type);
  });
});

methodTest(pawnWhite.getEatenPlays, () => {
  type DataEatenPlays = {
    situation: PieceSituation;
    plays: EatenPlay[];
  };
  const dataEatenPlays: DataEatenPlays[] = [
    {
      situation: { "+1.+1": pawnBlack, "+2.+2": box },
      plays: [
        new EatenPlay(
          D4,
          D4.getArrivalPosition("+2.+2"),
          D4.getArrivalPosition("+1.+1")
        ),
      ],
    },
    {
      situation: { "+1.-1": pawnBlack, "+2.-2": box },
      plays: [
        new EatenPlay(
          D4,
          D4.getArrivalPosition("+2.-2"),
          D4.getArrivalPosition("+1.-1")
        ),
      ],
    },
    {
      situation: { "-1.+1": pawnBlack, "-2.+2": box },
      plays: [
        new EatenPlay(
          D4,
          D4.getArrivalPosition("-2.+2"),
          D4.getArrivalPosition("-1.+1")
        ),
      ],
    },
    {
      situation: { "-1.-1": pawnBlack, "-2.-2": box },
      plays: [
        new EatenPlay(
          D4,
          D4.getArrivalPosition("-2.-2"),
          D4.getArrivalPosition("-1.-1")
        ),
      ],
    },
    {
      situation: { "-1.-1": box, "-2.-2": box },
      plays: [],
    },
    {
      situation: {
        "-1.-1": pawnBlack,
        "-2.-2": box,
        "+1.-1": pawnBlack,
        "+2.-2": box,
      },
      plays: [
        new EatenPlay(
          D4,
          D4.getArrivalPosition("+2.-2"),
          D4.getArrivalPosition("+1.-1")
        ),
        new EatenPlay(
          D4,
          D4.getArrivalPosition("-2.-2"),
          D4.getArrivalPosition("-1.-1")
        ),
      ],
    },
  ];
  const unitTestGetEatenPlay = (eatenPlay: {
    situation: PieceSituation;
    plays: TravelPlay[];
  }) => {
    const descriptionTest = `expect to return from [${map(
      eatenPlay.situation,
      (situation, coordinate) => `${coordinate}:${situation?.toStr()}`
    )}] the plays : [${eatenPlay.plays.map((play) => play.toStr())}]  `;
    it(descriptionTest, () => {
      expect(pawnWhite.getEatenPlays(eatenPlay.situation, D4)).toStrictEqual(
        eatenPlay.plays
      );
    });
  };
  dataEatenPlays.forEach(unitTestGetEatenPlay);
});
type TravelPlayData = {
  situation: PieceSituation;
  plays: TravelPlay[];
  pawn: Pawn;
};
methodTest(pawnWhite.getTravelPlays, () => {
  const testGetTravelPlaysData: TravelPlayData[] = [
    {
      pawn: pawnBlack,
      situation: { "+1.-1": pawnBlack, "-1.-1": box },
      plays: [TravelPlay.fromMove(D4, "-1.-1")],
    },
    {
      pawn: pawnBlack,
      situation: { "+1.-1": pawnBlack, "-1.-1": pawnBlack },
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: {},
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: { "+1.-1": box, "-1.-1": box },
      plays: [
        TravelPlay.fromMove(D4, "-1.-1"),
        TravelPlay.fromMove(D4, "+1.-1"),
      ],
    },
    {
      pawn: pawnWhite,
      situation: { "+1.+1": pawnBlack, "-1.+1": box },
      plays: [TravelPlay.fromMove(D4, "-1.+1")],
    },
    {
      pawn: pawnWhite,
      situation: { "+1.+1": pawnBlack, "-1.+1": pawnBlack },
      plays: [],
    },
    {
      pawn: pawnWhite,
      situation: { "+1.+1": box, "-1.+1": box },
      plays: [
        TravelPlay.fromMove(D4, "-1.+1"),
        TravelPlay.fromMove(D4, "+1.+1"),
      ],
    },
  ];
  const unitTestGetTravelPlay = (travelPlay: TravelPlayData) => {
    it(`expect to return travelPlays from [${Object.keys(
      travelPlay.situation
    )}] `, () => {
      expect(
        travelPlay.pawn.getTravelPlays(travelPlay.situation, D4)
      ).toIncludeSameMembers(travelPlay.plays);
    });
  };
  testGetTravelPlaysData.map(unitTestGetTravelPlay);
});
