import { START_BOARD_JSON } from "../Board/BoardState";
import { methodTest } from "../test/utils";
import PublicApi from "./PublicApi";
const party = new PublicApi("moutarde", "colonel");
methodTest(party.getBoard, () => {
  it("should return board === START_BOARD_JSON at the start", () => {
    expect(party.getBoard().board).toStrictEqual(START_BOARD_JSON);
  });
});
