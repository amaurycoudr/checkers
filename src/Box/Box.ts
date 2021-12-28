import { isEqual } from "lodash";
import { Utils } from "../genericInterface";

class Box implements Utils {
  isPiece(): boolean {
    return false;
  }
  toStr() {
    return "Box";
  }
  equals(o: Object): boolean {
    return isEqual(this, o);
  }
}
export default Box;
