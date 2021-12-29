import { methodTest, methodTestMap } from '../../../test/utils';
import EatenPlay from '../../EatenPlay/EatenPlay';
import PieceSituation from '../../PieceSituation/PieceSituation';
import { D4 } from '../../Position/Coordinate/coordinates';
import TravelPlay from '../../TravelPlay/TravelPlay';
import { WHITE } from '../../utils/type';
import Pawn from './Pawn';
import { pawnBlack, pawnWhite } from './pawns';

methodTest(pawnWhite.getJSON, () => {
  it(`should return {type:"Pawn, player:${WHITE}} for pawnWhite.getJSON()`, () => {
    expect(pawnWhite.getJSON().player).toBe(WHITE);
    expect(pawnWhite.getJSON().type).toBe(pawnWhite.type);
  });
});

type DataPlay = {
  situation: PieceSituation;
  plays: TravelPlay[];
  pawn: Pawn;
};

const descriptionPlay = (data: DataPlay) => {
  const playsStr = data.plays.map((play) => play.toStr());
  return `should return [${playsStr}] for SITUATION : ${data.situation.toStr()}, PIECE : ${data.pawn.toStr()}, POSITION : ${D4.toStr()} `;
};

const expectEatenPlay = (data: DataPlay) => {
  expect(data.pawn.getEatenPlays(data.situation, D4)).toIncludeSameMembers(
    data.plays,
  );
};

methodTestMap<DataPlay>(
  pawnWhite.getEatenPlays,
  [
    {
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'black' },
        '+2.+2': { type: 'Box' },
      }),
      plays: [EatenPlay.eatenPlayFromMove(D4, '+2.+2', '+1.+1')],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'white' },
        '+2.+2': { type: 'Box' },
      }),
      plays: [EatenPlay.eatenPlayFromMove(D4, '+2.+2', '+1.+1')],
      pawn: pawnBlack,
    },
    {
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'white' },
        '+2.+2': { type: 'Box' },
      }),
      plays: [],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'black' },
        '+2.+2': { type: 'Box' },
      }),
      plays: [],
      pawn: pawnBlack,
    },
    {
      situation: new PieceSituation({
        '+1.-1': { type: 'Pawn', color: 'black' },
        '+2.-2': { type: 'Box' },
      }),
      plays: [EatenPlay.eatenPlayFromMove(D4, '+2.-2', '+1.-1')],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({
        '-1.+1': { type: 'Pawn', color: 'black' },
        '-2.+2': { type: 'Box' },
      }),
      plays: [EatenPlay.eatenPlayFromMove(D4, '-2.+2', '-1.+1')],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({
        '-1.-1': { type: 'Pawn', color: 'black' },
        '-2.-2': { type: 'Box' },
      }),
      plays: [EatenPlay.eatenPlayFromMove(D4, '-2.-2', '-1.-1')],
      pawn: pawnWhite,
    },
    {
      situation: new PieceSituation({
        '-1.-1': { type: 'Box' },
        '-2.-2': { type: 'Box' },
      }),
      pawn: pawnWhite,
      plays: [],
    },
    {
      situation: new PieceSituation({
        '-1.-1': pawnBlack,
        '-2.-2': { type: 'Box' },
        '+1.-1': pawnBlack,
        '+2.-2': { type: 'Box' },
      }),
      pawn: pawnWhite,
      plays: [
        EatenPlay.eatenPlayFromMove(D4, '+2.-2', '+1.-1'),
        EatenPlay.eatenPlayFromMove(D4, '-2.-2', '-1.-1'),
      ],
    },
  ],
  descriptionPlay,
  expectEatenPlay,
);

const expectTravelPlay = (data: DataPlay) => {
  expect(data.pawn.getTravelPlays(data.situation, D4)).toIncludeSameMembers(
    data.plays,
  );
};

methodTestMap(
  pawnWhite.getTravelPlays,
  [
    {
      pawn: pawnBlack,
      situation: new PieceSituation({
        '+1.-1': { type: 'Pawn', color: 'black' },
        '-1.-1': { type: 'Box' },
      }),
      plays: [TravelPlay.fromMove(D4, '-1.-1')],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({
        '+1.-1': { type: 'Pawn', color: 'black' },
        '-1.-1': { type: 'Pawn', color: 'black' },
      }),
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({}),
      plays: [],
    },
    {
      pawn: pawnBlack,
      situation: new PieceSituation({
        '+1.-1': { type: 'Box' },
        '-1.-1': { type: 'Box' },
      }),
      plays: [
        TravelPlay.fromMove(D4, '-1.-1'),
        TravelPlay.fromMove(D4, '+1.-1'),
      ],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'black' },
        '-1.+1': { type: 'Box' },
      }),
      plays: [TravelPlay.fromMove(D4, '-1.+1')],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({
        '+1.+1': { type: 'Pawn', color: 'black' },
        '-1.+1': { type: 'Pawn', color: 'black' },
      }),
      plays: [],
    },
    {
      pawn: pawnWhite,
      situation: new PieceSituation({
        '+1.+1': { type: 'Box' },
        '-1.+1': { type: 'Box' },
      }),
      plays: [
        TravelPlay.fromMove(D4, '-1.+1'),
        TravelPlay.fromMove(D4, '+1.+1'),
      ],
    },
  ],
  descriptionPlay,
  expectTravelPlay,
);
