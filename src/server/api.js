const multer = require("multer");
const services = require("./services");

const multipartHandler = multer().single("data");

function parseBlob(file) {
  if (file && file.buffer) {
    if (file.mimetype === "application/json") {
      return JSON.parse(file.buffer.toString()).data;
    }
    return file.buffer.toString();
  }
  return undefined;
}

function validate(req, res) {
  if (!req.file) {
    return res.status(415).send("Invalid request");
  }

  return undefined;
}

module.exports = (router) => {
  router.post("/compress", multipartHandler, (req, res) => validate(req, res) || res.send(services.compress(parseBlob(req.file))));
  router.post("/decompress", multipartHandler, (req, res) => validate(req, res) || res.send(services.decompress(parseBlob(req.file))));
  return router;
};
