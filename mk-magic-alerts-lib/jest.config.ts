
module.exports = {
  preset: 'jest-preset-angular',
  maxWorkers: "4", // Use 4 threads for parallel test runs
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
    '!<rootDir>/projects/mk-magic-alerts/src/lib/mocks/',
    '!<rootDir>/projects/mk-magic-alerts/src/lib/test-helpers/',
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/projects/mk-magic-alerts/src/**/*.{ts,js}',
    '!<rootDir>/projects/mk-magic-alerts/src/public-api.ts',
    '!<rootDir>/projects/mk-magic-alerts/src/lib/*.module.ts', // Exclude module files
    '!<rootDir>/projects/mk-magic-alerts/src/lib/mocks/*.ts', // Exclude mocks
    '!<rootDir>/projects/mk-magic-alerts/src/lib/test-helpers/*.ts', // Exclude test-helpers
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
};
