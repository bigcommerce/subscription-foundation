/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  publicRuntimeConfig: {
    environment: process.env.ENV_NAME,
    bigcommerce: {
      appClientId: process.env.BC_APP_CLIENT_ID,
      appSecret: process.env.BC_APP_SECRET,
      appCallbackUrl: process.env.BC_APP_CALLBACK_URL
    }
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/scss/common.module.scss")]
  }
};
