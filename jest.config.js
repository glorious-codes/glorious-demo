const fs = require('fs'),
  argv = require('yargs').argv,
  project = require('./project.json');

module.exports = {
  "clearMocks": true,
  "collectCoverageFrom": [project.scripts.source.files],
  "coverageReporters": ["html"],
  "coverageThreshold": {
    "global": {
      "statements": 100,
      "branches": 100,
      "functions": 100,
      "lines": 100
    }
  },
  "moduleNameMapper": {
    '@styles\/(.*)$': `<rootDir>/${project.styles.source.root}$1`,
    '@mocks\/(.*)$': `<rootDir>/${project.mocks.source.root}$1`
  },
  "transform": {
    "^.+\\.(css|styl)$": "<rootDir>/src/mocks/styles-mock.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.html$": "html-loader-jest"
  }
}
