import { box } from "../BoxContent/boxes";
import EatenPlay from "../EatenPlay/EatenPlay";
import { eatenPlay } from "../EatenPlay/eatenPlays";
import PieceSituation, {
  PieceSituationType,
} from "../PieceSituation/PieceSituation";
import { D4 } from "../Position/positions";
import { methodTest, methodTestMap } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { WHITE } from "../utils/type";
import Pawn from "./Pawn";
import { pawnBlack, pawnWhite } from "./pawns";

methodTest(pawnWhite.getJSON, () => {
  it(`should return {type:"Pawn, player:${WHITE}} for pawnWhite.getJSON()`, () => {
    expect(pawnWhite.getJSON().player).toBe(WHITE);
    expect(pawnWhite.getJSON().type).toBe(Pawn.type);
  });
});

type DataPlay = {
  situation: PieceSituation;
  plays: TravelPlay[];
  pawn: Pawn;
};

const descriptionPlay = (data: DataPlay) => {
  return `should return [${data.plays.map((play) =>
    play.toStr()
  )}] for SITUATION : ${data.situation.toStr()}, PIECE : ${data.pawn.toStr()}, POSITION : ${D4.toStr()} `;
};

const expectEatenPlay = (data: DataPlay) => {
  expect(data.pawn.getEatenPlays(data.situation, D4)).toIncludeSameMembers(
    data.plays
  );
};

methodTestMap<DataPlay>(
  pawnWhite.getEatenPlays,
  [
    {
      situation: new PieceSituation({ "+1.+1": pawnBlack, "+2.+2": box }),
      plays: [eatenPlay(D4, "+2.+2", "+1.+1")],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({ "+1.+1": pawnWhite, "+2.+2": box }),
      plays: [eatenPlay(D4, "+2.+2", "+1.+1")],
      pawn: pawnBlack,
    },
    {
      situation: new PieceSituation({ "+1.+1": pawnWhite, "+2.+2": box }),
      plays: [],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({ "+1.+1": pawnBlack, "+2.+2": box }),
      plays: [],
      pawn: pawnBlack,
    },
    {
      situation: new PieceSituation({ "+1.-1": pawnBlack, "+2.-2": box }),
      plays: [eatenPlay(D4, "+2.-2", "+1.-1")],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({ "-1.+1": pawnBlack, "-2.+2": box }),
      plays: [eatenPlay(D4, "-2.+2", "-1.+1")],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({ "-1.-1": pawnBlack, "-2.-2": box }),
      plays: [eatenPlay(D4, "-2.-2", "-1.-1")],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({ "-1.-1": box, "-2.-2": box }),
      pawn: pawnWhite,
      plays: [],
    },
    {
      situation: new PieceSituation({
        "-1.-1": pawnBlack,
        "-2.-2": box,
        "+1.-1": pawnBlack,
        "+2.-2": box,
      }),
      pawn: pawnWhite,
      plays: [eatenPlay(D4, "+2.-2", "+1.-1"), eatenPlay(D4, "-2.-2", "-1.-1")],
    },
  ],
  descriptionPlay,
  expectEatenPlay
);

const expectTravelPlay = (data: DataPlay) => {
  expect(data.pawn.getTravelPlays(data.situation, D4)).toIncludeSameMembers(
    data.plays
  );
};

methodTestMap(
  pawnWhite.getTravelPlays,
  [
    {
      pawn: pawnBlack,
      situation: new PieceSituation({ "+1.-1": pawnBlack, "-1.-1": box }),
      plays: [TravelPlay.fromMove(D4, "-1.-1")],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({ "+1.-1": pawnBlack, "-1.-1": pawnBlack }),
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({}),
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({ "+1.-1": box, "-1.-1": box }),
      plays: [
        TravelPlay.fromMove(D4, "-1.-1"),
        TravelPlay.fromMove(D4, "+1.-1"),
      ],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({ "+1.+1": pawnBlack, "-1.+1": box }),
      plays: [TravelPlay.fromMove(D4, "-1.+1")],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({ "+1.+1": pawnBlack, "-1.+1": pawnBlack }),
      plays: [],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({ "+1.+1": box, "-1.+1": box }),
      plays: [
        TravelPlay.fromMove(D4, "-1.+1"),
        TravelPlay.fromMove(D4, "+1.+1"),
      ],
    },
  ],
  descriptionPlay,
  expectTravelPlay
);
