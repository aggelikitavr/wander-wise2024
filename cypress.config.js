const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Placeholder for future node event listeners
      // Example:
      on('before:run', () => {
        console.log('Test run is starting');
      });
    },
    baseUrl: "http://localhost:8060", // Set a base URL for your application
    specPattern: "cypress/e2e/**/*.cy.js", // Define the pattern for spec files
    supportFile: "cypress/support/e2e.js", // Specify the support file location
    viewportWidth: 1280, // Set default viewport width
    viewportHeight: 720, // Set default viewport height
  },
});