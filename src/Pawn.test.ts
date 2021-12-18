import Box from "./Box";
import Pawn from "./Pawn";
import TravelPlay from "./TravelPlay";
import Player from "./Player";
import Position from "./Position";
import { BLACK, BOTTOM, PieceSituation, TOP, WHITE } from "./utils/type";
import EatenPlay from "./EatenPlay";
const whitePlayer = new Player(WHITE, TOP, "bam");
const blackPlayer = new Player(BLACK, BOTTOM, "bam");

const position = new Position(3, 3);

const pawnWhite = new Pawn(whitePlayer);
const pawnBlack = new Pawn(blackPlayer);

describe("test getJSON()", () => {
  it(`should return {type:"Pawn, player:${WHITE}} for pawnWhite.getJSON()`, () => {
    expect(pawnWhite.getJSON().player).toBe(WHITE);
    expect(pawnWhite.getJSON().type).toBe(Pawn.type);
  });
});

const testGetEatenPlaysData: {
  situation: PieceSituation;
  plays: EatenPlay[];
}[] = [
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
  it(`expect to return eatenPlays from [${Object.keys(
    eatenPlay.situation
  )}] `, () => {
    expect(
      pawnWhite.getEatenPlays(eatenPlay.situation, position)
    ).toStrictEqual(eatenPlay.plays);
  });
};
describe("test getEatenPlay()", () => {
  testGetEatenPlaysData.forEach(unitTestGetEatenPlay);
});

const testGetTravelPlaysData: {
  situation: PieceSituation;
  plays: TravelPlay[];
  player: Player;
}[] = [
  {
    player: new Player(WHITE, TOP, "player"),
    situation: { "+1.-1": pawnBlack, "-1.-1": new Box() },
    plays: [new TravelPlay(position, position.getArrivalPosition("-1.-1"))],
  },
  {
    player: new Player(WHITE, TOP, "player"),
    situation: { "+1.-1": pawnBlack, "-1.-1": pawnBlack },
    plays: [],
  },
  {
    player: new Player(WHITE, TOP, "player"),
    situation: { "+1.-1": new Box(), "-1.-1": new Box() },
    plays: [
      new TravelPlay(position, position.getArrivalPosition("-1.-1")),
      new TravelPlay(position, position.getArrivalPosition("+1.-1")),
    ],
  },
  {
    player: new Player(WHITE, BOTTOM, "player"),
    situation: { "+1.+1": pawnBlack, "-1.+1": new Box() },
    plays: [new TravelPlay(position, position.getArrivalPosition("-1.+1"))],
  },
  {
    player: new Player(WHITE, BOTTOM, "player"),
    situation: { "+1.+1": pawnBlack, "-1.+1": pawnBlack },
    plays: [],
  },
  {
    player: new Player(WHITE, BOTTOM, "player"),
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
      new Pawn(travelPlay.player).getTravelPlays(travelPlay.situation, position)
    ).toIncludeSameMembers(travelPlay.plays);
  });
};
describe("test getTravelPlay()", () => {
  testGetTravelPlaysData.map(unitTestGetTravelPlay);
});
