module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@actions/core$': '<rootDir>/__tests__/mocks/actions-core.ts',
    '^@actions/exec$': '<rootDir>/__tests__/mocks/actions-exec.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node'
        }
      }
    ]
  },
  verbose: true
}
