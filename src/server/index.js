const express = require("express");
const cors = require("cors");
const routes = require("./routes");

module.exports = () => {
  const app = express();
  app.use(cors());
  routes(app);
  return app;
};
