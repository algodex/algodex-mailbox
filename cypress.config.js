const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#__next',
    },
  },
  viewportWidth: 1300,
  viewportHeight: 1000,
  defaultCommandTimeout: 10000,
  requestTimeout: 100000,
  responseTimeout: 100000,
  pageLoadTimeout: 100000,
  video: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
  },
})
