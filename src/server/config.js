const dotenv = require("dotenv");

dotenv.config();

function env(key, defaultValue) {
  const res = process.env[key];
  return res || defaultValue;
}

process.env.API_PREFIX = process.env.NODE_ENV === "development" ? "/" : "/.netlify/functions/serverless/";

module.exports = {
  port: parseInt(env("PORT", "8080"), 10),
  api: {
    basePath: env("API_PREFIX", "/")
  }
};
