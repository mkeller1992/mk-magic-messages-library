
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
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
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
};
