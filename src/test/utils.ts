export const methodTest = (method: Function, tests: jest.EmptyFunction) => {
  describe(`--- test ${method.toString().split("{")[0]}`, tests);
};


