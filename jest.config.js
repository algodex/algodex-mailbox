module.exports = {
  projects: [
    {
      displayName: 'components',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/components/**/*.spec.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      }
    },
    {
      displayName: 'lib',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/**/*.spec.js']
    }
  ],

  coverageThreshold: {
    // TODO: Raise confidence
    global: {
      branches: 10,
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!.next/**/*.js',
    '!node_modules/**/*.js',
    '!coverage/**/*.js',
    '!cypress/**/*.js',
    '!public/**/*.js',
    '!**/*.stories.js',
    '!**/*.config.js',
    '!**/*.spec.js',
  ],
  coverageReporters: ['lcov', 'json-summary', 'json', 'text']
}
