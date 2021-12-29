import { ONE_PLAY_BOARD_ARRAY, START_BOARD_ARRAY } from '../Board/BoardState';
import {
  A5,
  B4,
  C5,
  D4,
  E5,
  F4,
  G5,
  H4,
  I5,
  J4,
} from '../Position/Coordinate/coordinates';
import { methodTest } from '../../test/utils';
import TravelPlay from '../TravelPlay/TravelPlay';
import PublicApi from './PublicApi';

const party = new PublicApi();

const whiteFirstTurnPlays = [
  new TravelPlay(B4, A5),
  new TravelPlay(B4, C5),
  new TravelPlay(D4, C5),
  new TravelPlay(D4, E5),
  new TravelPlay(F4, E5),
  new TravelPlay(F4, G5),
  new TravelPlay(H4, G5),
  new TravelPlay(H4, I5),
  new TravelPlay(J4, I5),
].map((play) => play.getJSON());

methodTest(party.getState, () => {
  it('should return board === START_BOARD_ARRAY at the start', () => {
    expect(party.getState().board).toStrictEqual(START_BOARD_ARRAY);
  });

  it('should return plays === startPlayPossible at the start', () => {
    expect(party.getState().plays).toIncludeSameMembers(whiteFirstTurnPlays);
  });

  it("should return  board === ONE_PLAY_BOARD_ARRAY after play({ from: 'B4', to: 'A5' })", () => {
    party.play({ from: 'B4', to: 'A5' });
    expect(party.getState().board).toStrictEqual(ONE_PLAY_BOARD_ARRAY);
  });
});
