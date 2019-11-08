const serverless = require("serverless-http");
const app = require("../");

exports.handler = serverless(app());
