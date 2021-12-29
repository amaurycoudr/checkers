import { A1, A2, B2 } from "../Position/Coordinate/coordinates";
import { methodTest } from "../test/utils";
import EatenPlay from "./EatenPlay";

const eatenPlay = new EatenPlay(A2, B2, A1);
methodTest(eatenPlay.toStr, () => {
  it(`should return {from: ${A2.toStr()}, to: ${B2.toStr()}, eaten: ${A1.toStr()}} for new EatenPlay(${A2.toStr()}, ${B2.toStr()}, ${A1.toStr()})`, () => {
    expect(eatenPlay.toStr()).toBe(
      `{from: ${A2.toStr()}, to: ${B2.toStr()}, eaten: ${A1.toStr()}}`
    );
  });
});
