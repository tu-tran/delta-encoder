const express = require("express");

const conf = require("./config");
const api = require("./api");

module.exports = (app) => {
  app.use(express.static("dist"));
  const router = api(express.Router());
  router.get("/", (req, res) => {
    res.send("<h1>🚀 WE ARE LIVE, API! 🚀</h1>").end();
  });

  app.use(conf.api.basePath, router);
  return router;
};
