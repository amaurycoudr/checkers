import EatenPlay from "./EatenPlay";
import Position from "../Position/Position";
import { methodTest } from "../test/utils";

const FROM = new Position(0, 1);
const TO = new Position(1, 1);
const EATEN = new Position(0, 0);
const eatenPlay = new EatenPlay(FROM, TO, EATEN);
methodTest(eatenPlay.toStr, () => {
  it(`should return {from: ${FROM.toStr()}, to: ${TO.toStr()}, eaten: ${EATEN.toStr()}} for new EatenPlay(${FROM.toStr()}, ${TO.toStr()}, ${EATEN.toStr()})`, () => {
    expect(eatenPlay.toStr()).toBe(
      `{from: ${FROM.toStr()}, to: ${TO.toStr()}, eaten: ${EATEN.toStr()}}`
    );
  });
});
