import EatenPlay from "./EatenPlay";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";
import { A2, B2, A1 } from "../Position/coordinates";

const eatenPlay = new EatenPlay(A2, B2, A1);
methodTest(eatenPlay.toStr, () => {
  it(`should return {from: ${A2.toStr()}, to: ${B2.toStr()}, eaten: ${A1.toStr()}} for new EatenPlay(${A2.toStr()}, ${B2.toStr()}, ${A1.toStr()})`, () => {
    expect(eatenPlay.toStr()).toBe(
      `{from: ${A2.toStr()}, to: ${B2.toStr()}, eaten: ${A1.toStr()}}`
    );
  });
});
