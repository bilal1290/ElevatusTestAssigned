const MailosaurClient = require("mailosaur");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
    async getMailosaurEmail({ apiKey, serverId, testEmail }) {
      const client = new MailosaurClient(apiKey);
      const email = await client.messages.get(
        serverId,
        { sentTo: testEmail },
        { timeout: 120000 } // wait up to 2 mins
      );
      return email;
    },
  });
  return config;
    },
    env: {
      MAILOSAUR_API_KEY: "ocF8Cd817h9xxB7gU8PxG5KGeW7OyQZy",
      MAILOSAUR_SERVER_ID: "nbgwiect"
    },
    baseUrl: 'https://automationszaid.elevatus.io',
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    experimentalOriginDependencies: true
  },
};
