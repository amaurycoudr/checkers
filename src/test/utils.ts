import { Position } from '..';
import { forBoard, forMove } from '../utils/fn';

export const methodTest = (method: (...arg: any) => void, tests: jest.EmptyFunction) => {
  describe(`--- test ${method.toString().split('{')[0]}`, tests);
};

export function methodTestMap<T>(
  method: (...arg: any) => void,
  data: T[],
  description: (arg: T) => string,
  expect: (arg: T) => void,
) {
  methodTest(method, () => {
    data.forEach((value) => {
      it(description(value), () => {
        expect(value);
      });
    });
  });
}
export function methodTestFordBoard(
  method: (...arg: any) => void,
  it: (p: Position, x: number, y: number) => void,
) {
  methodTest(method, () => {
    forBoard((...arg) => {
      it(...arg);
    });
  });
}

export function methodTestForMove(
  method: (...arg: any) => void,
  it: (x: number, y: number) => void,
) {
  methodTest(method, () => {
    forMove((p, ...arg) => {
      it(...arg);
    });
  });
}
