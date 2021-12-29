import { isEqual } from 'lodash';
import { Utils } from '../genericInterface';
import { BOX_TYPE, ContentType } from '../utils/board';

class EmptyBox implements Utils {
  type: ContentType = BOX_TYPE;

  toStr() {
    return this.type;
  }

  equals(o: unknown): boolean {
    return isEqual(this, o);
  }
}

export default EmptyBox;

export const box = new EmptyBox();
