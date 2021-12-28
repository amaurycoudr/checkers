import { Position } from "..";
import { forBoard, forMove } from "../utils/fn";

export const methodTest = (method: Function, tests: jest.EmptyFunction) => {
  describe(`--- test ${method.toString().split("{")[0]}`, tests);
};

export function methodTestMap<T>(
  method: Function,
  data: T[],
  description: (arg: T) => string,
  expect: (arg: T) => void
) {
  methodTest(method, () => {
    data.map((value) => {
      it(description(value), () => {
        expect(value);
      });
    });
  });
}
export function methodTestFordBoard(
  method: Function,
  it: (p: Position, x: number, y: number) => void
) {
  methodTest(method, () => {
    forBoard((...arg) => {
      it(...arg);
    });
  });
}

export function methodTestForMove(
  method: Function,
  it: (x: number, y: number) => void
) {
  methodTest(method, () => {
    forMove((p, ...arg) => {
      it(...arg);
    });
  });
}
