import { isEqual, map } from "lodash";
import EmptyBox from "../EmptyBox/EmptyBox";
import { Utils } from "../genericInterface";
import { MoveStr } from "../utils/type";

export type PieceSituationType = { [key in MoveStr[number]]?: EmptyBox };
class PieceSituation implements Utils {
  private situation: PieceSituationType;
  constructor(situation: PieceSituationType) {
    this.situation = situation;
  }
  get() {
    return this.situation;
  }
  toStr(): string {
    return `{${map(
      this.situation,
      (BoxContent, move) => ` (${move}) : ${BoxContent?.toStr()} `
    )}}`;
  }
  equals(o: PieceSituation): boolean {
    return isEqual(o.situation, this.situation);
  }
}
export default PieceSituation;
