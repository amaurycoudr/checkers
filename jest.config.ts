import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 80,
    },
  },
  coverageReporters: ['json-summary', 'text'],
  setupFilesAfterEnv: ['jest-extended/all'],
};
export default config;
