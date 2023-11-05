const { defineConfig } = require("cypress");
const {GoogleSocialLogin} = require('cypress-social-logins').plugins;

module.exports = defineConfig({
  projectId: "a65feg",
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        customizedLogin(options) {
          return GoogleSocialLogin(options);
        }
      })
    },
  },
});
