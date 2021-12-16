import EatenPlay from "./EatenPlay";
import Position from "./Position";

const FROM = new Position(0, 1);
const TO = new Position(1, 1);
const EATEN = new Position(0, 0);
describe("test toStr()", () => {
  it(`should return  {from: ${FROM.toStr()}, to: ${TO.toStr()}, eaten: ${EATEN.toStr()}} for new EatenPlay(${FROM.toStr()}, ${TO.toStr()}, ${EATEN.toStr()})`, () => {
    expect(new EatenPlay(FROM, TO, EATEN).toStr()).toBe(
      `{from: ${FROM.toStr()}, to: ${TO.toStr()}, eaten: ${EATEN.toStr()}}`
    );
  });
});
