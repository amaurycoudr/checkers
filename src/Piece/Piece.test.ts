import { pawnBlack, pawnWhite } from './Pawn/pawns';
import { methodTest } from '../../test/utils';
import { BLACK, WHITE } from '../utils/type';

methodTest(pawnBlack.isOpponent, () => {
  it('return false if piece.player has the same color', () => {
    expect(pawnBlack.isOpponent(BLACK)).toBe(false);
    expect(pawnWhite.isOpponent(WHITE)).toBe(false);
  });
  it('return true if piece.player has a different color', () => {
    expect(pawnBlack.isOpponent(WHITE)).toBe(true);
    expect(pawnWhite.isOpponent(BLACK)).toBe(true);
  });
});

methodTest(pawnBlack.equals, () => {
  it('return true if piece.player and piece.type are equals ', () => {
    expect(pawnBlack.equals(pawnBlack)).toBe(true);
    expect(pawnWhite.equals(pawnWhite)).toBe(true);
  });
  it('return false if piece.player or piece.type are differents ', () => {
    expect(pawnBlack.equals(pawnBlack)).toBe(true);
    expect(pawnWhite.equals(pawnWhite)).toBe(true);
  });
});
