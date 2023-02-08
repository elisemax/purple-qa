const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo',
  },
});
