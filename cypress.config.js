const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, _) {
      on('before:run', () => {
        console.log('Initilization of the acceptance tests!');
      });
    },
  },
});
