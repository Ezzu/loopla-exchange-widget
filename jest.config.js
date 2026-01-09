module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^controllers$': '<rootDir>/src/controllers/index.ts',
    '^services$': '<rootDir>/src/services/index.ts',
    '^middlewares$': '<rootDir>/src/middlewares/index.ts',
    '^errors$': '<rootDir>/src/errors/index.ts',
    '^routes$': '<rootDir>/src/routes/index.ts',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
};