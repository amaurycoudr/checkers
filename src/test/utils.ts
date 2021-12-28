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
