const server = require("./src/server");
const { port } = require("./src/server/config");

server().listen(port, () => console.log(`Listening on port ${port}!`));
