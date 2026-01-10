module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^controllers$': '<rootDir>/src/controllers/index.ts',
    '^errors$': '<rootDir>/src/errors/index.ts',
    '^services$': '<rootDir>/src/services/index.ts',
    '^routes$': '<rootDir>/src/routes/index.ts',
    '^middlewares$': '<rootDir>/src/middlewares/index.ts',
    '^config$': '<rootDir>/src/config/index.ts',
    '^types$': '<rootDir>/src/types/index.ts',
    '^utils$': '<rootDir>/src/utils/index.ts',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
};
