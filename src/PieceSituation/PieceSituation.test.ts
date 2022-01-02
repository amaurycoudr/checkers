import { methodTest } from '../test/utils';
import PieceSituation from './PieceSituation';

const pieceSituation = new PieceSituation({
  '+1.+1': { type: 'Box' },
  '+2.+1': { type: 'Pawn', color: 'white' },
});
methodTest(pieceSituation.toStr, () => {
  it('should return { (+1.+1) : Box , (+2.+1) : Pawn white } for pieceSituation ', () => {
    expect(pieceSituation.toStr()).toBe(
      '{ (+1.+1) : Box , (+2.+1) : Pawn white }',
    );
  });
  it('should return "{}" for {"+1:+1":undefined} ', () => {
    expect(new PieceSituation({ '+1.+1': undefined }).toStr()).toBe('{}');
  });
});

methodTest(pieceSituation.isEmptyBox, () => {
  it('should return false if it is a piece', () => {
    expect(pieceSituation.isEmptyBox('+2.+1')).toBe(false);
  });

  it('should return true if it is a piece', () => {
    expect(pieceSituation.isEmptyBox('+1.+1')).toBe(true);
  });
});

methodTest(pieceSituation.isOpponentPiece, () => {
  it('should return false if it is a piece of the same color', () => {
    expect(pieceSituation.isOpponentPiece('+2.+1', 'white')).toBe(false);
  });
  it('should return false if it is a box', () => {
    expect(pieceSituation.isOpponentPiece('+1.+1', 'black')).toBe(false);
  });

  it('should return true if it is a piece of the opponent', () => {
    expect(pieceSituation.isOpponentPiece('+2.+1', 'black')).toBe(true);
  });
});
