
module.exports = {
  preset: 'jest-preset-angular',
  maxWorkers: "4", // Use 4 threads for parallel test runs
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
    '!<rootDir>/projects/mk-magic-alerts/src/lib/mocks/',
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
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
};
