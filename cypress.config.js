const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8060", // Set your base URL for tests
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Customize test file patterns
    supportFile: "cypress/support/e2e.js", // Specify the support file location
    viewportWidth: 1280, // Default viewport width
    viewportHeight: 720, // Default viewport height
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});