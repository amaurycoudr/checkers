import { pawnBlack } from '../Piece/Pawn/pawns';
import { methodTest } from '../test/utils';
import EmptyBox from './EmptyBox';

const emptyBox = new EmptyBox();

methodTest(emptyBox.equals, () => {
  it('should be false if it is not a box', () => {
    expect(emptyBox.equals(pawnBlack)).toBe(false);
  });

  it('should be true if it is a box', () => {
    expect(emptyBox.equals(emptyBox)).toBe(true);
  });
});
