'use strict';

module.exports = {
  roots: [
    'tests'
  ],
  verbose: false,
  testEnvironment: 'node',
  testRegex: 'tests/(.*/)*.*test.js$',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'server/**/*',
    'app.js'
  ],
  transformIgnorePatterns: ['/node_modules/']
};
