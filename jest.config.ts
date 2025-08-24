import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};

export default config;
