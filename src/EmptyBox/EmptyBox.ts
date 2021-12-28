import { isEqual } from "lodash";
import { Utils } from "../genericInterface";

class EmptyBox implements Utils {
  toStr() {
    return "Box";
  }
  equals(o: Object): boolean {
    return isEqual(this, o);
  }
}
export default EmptyBox;
