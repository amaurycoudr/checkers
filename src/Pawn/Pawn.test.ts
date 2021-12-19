import { map } from "lodash";
import Box from "../Box/Box";
import EatenPlay from "../EatenPlay/EatenPlay";
import Player from "../Player/Player";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
import TravelPlay from "../TravelPlay/TravelPlay";
import { BLACK, PieceSituation, WHITE } from "../utils/type";
import Pawn from "./Pawn";
const whitePlayer = new Player(WHITE, "bam");
const blackPlayer = new Player(BLACK, "bam");

const position = new Position(3, 3);

const pawnWhite = new Pawn(whitePlayer);
const pawnBlack = new Pawn(blackPlayer);

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
      situation: { "+1.+1": pawnBlack, "+2.+2": new Box() },
      plays: [
        new EatenPlay(
          position,
          position.getArrivalPosition("+2.+2"),
          position.getArrivalPosition("+1.+1")
        ),
      ],
    },
    {
      situation: { "+1.-1": pawnBlack, "+2.-2": new Box() },
      plays: [
        new EatenPlay(
          position,
          position.getArrivalPosition("+2.-2"),
          position.getArrivalPosition("+1.-1")
        ),
      ],
    },
    {
      situation: { "-1.+1": pawnBlack, "-2.+2": new Box() },
      plays: [
        new EatenPlay(
          position,
          position.getArrivalPosition("-2.+2"),
          position.getArrivalPosition("-1.+1")
        ),
      ],
    },
    {
      situation: { "-1.-1": pawnBlack, "-2.-2": new Box() },
      plays: [
        new EatenPlay(
          position,
          position.getArrivalPosition("-2.-2"),
          position.getArrivalPosition("-1.-1")
        ),
      ],
    },
    {
      situation: { "-1.-1": new Box(), "-2.-2": new Box() },
      plays: [],
    },
    {
      situation: {
        "-1.-1": pawnBlack,
        "-2.-2": new Box(),
        "+1.-1": pawnBlack,
        "+2.-2": new Box(),
      },
      plays: [
        new EatenPlay(
          position,
          position.getArrivalPosition("+2.-2"),
          position.getArrivalPosition("+1.-1")
        ),
        new EatenPlay(
          position,
          position.getArrivalPosition("-2.-2"),
          position.getArrivalPosition("-1.-1")
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
      expect(
        pawnWhite.getEatenPlays(eatenPlay.situation, position)
      ).toStrictEqual(eatenPlay.plays);
    });
  };
  dataEatenPlays.forEach(unitTestGetEatenPlay);
});

methodTest(pawnWhite.getTravelPlays, () => {
  const testGetTravelPlaysData: {
    situation: PieceSituation;
    plays: TravelPlay[];
    player: Player;
  }[] = [
    {
      player: new Player(BLACK, "player"),
      situation: { "+1.-1": pawnBlack, "-1.-1": new Box() },
      plays: [new TravelPlay(position, position.getArrivalPosition("-1.-1"))],
    },
    {
      player: new Player(BLACK, "player"),
      situation: { "+1.-1": pawnBlack, "-1.-1": pawnBlack },
      plays: [],
    },
    {
      player: new Player(BLACK, "player"),
      situation: { "+1.-1": new Box(), "-1.-1": new Box() },
      plays: [
        new TravelPlay(position, position.getArrivalPosition("-1.-1")),
        new TravelPlay(position, position.getArrivalPosition("+1.-1")),
      ],
    },
    {
      player: new Player(WHITE, "player"),
      situation: { "+1.+1": pawnBlack, "-1.+1": new Box() },
      plays: [new TravelPlay(position, position.getArrivalPosition("-1.+1"))],
    },
    {
      player: new Player(WHITE, "player"),
      situation: { "+1.+1": pawnBlack, "-1.+1": pawnBlack },
      plays: [],
    },
    {
      player: new Player(WHITE, "player"),
      situation: { "+1.+1": new Box(), "-1.+1": new Box() },
      plays: [
        new TravelPlay(position, position.getArrivalPosition("-1.+1")),
        new TravelPlay(position, position.getArrivalPosition("+1.+1")),
      ],
    },
  ];
  const unitTestGetTravelPlay = (travelPlay: {
    situation: PieceSituation;
    player: Player;
    plays: TravelPlay[];
  }) => {
    it(`expect to return travelPlays from [${Object.keys(
      travelPlay.situation
    )}] `, () => {
      expect(
        new Pawn(travelPlay.player).getTravelPlays(
          travelPlay.situation,
          position
        )
      ).toIncludeSameMembers(travelPlay.plays);
    });
  };
  testGetTravelPlaysData.map(unitTestGetTravelPlay);
});
