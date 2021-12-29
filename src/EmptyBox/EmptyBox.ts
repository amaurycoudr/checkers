import { isEqual } from 'lodash';
import { Utils } from '../genericInterface';

class EmptyBox implements Utils {
  type = 'Box';

  toStr() {
    return this.type;
  }

  equals(o: unknown): boolean {
    return isEqual(this, o);
  }
}

export default EmptyBox;

export const box = new EmptyBox();
