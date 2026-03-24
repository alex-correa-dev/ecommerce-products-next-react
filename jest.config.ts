import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/app/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@/types/(.*)$': '<rootDir>/src/app/types/$1',
    '^@/providers/(.*)$': '<rootDir>/src/app/providers/$1',
    '^@/utils/(.*)$': '<rootDir>/src/app/utils/$1',
    '^@/constants/(.*)$': '<rootDir>/src/app/constants/$1',
    '^@/enums/(.*)$': '<rootDir>/src/app/enums/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/src/**/*.test.ts',
    '**/src/**/*.test.tsx',
    '**/src/**/*.spec.ts',
    '**/src/**/*.spec.tsx',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default config;