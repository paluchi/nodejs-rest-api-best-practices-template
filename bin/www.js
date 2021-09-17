const http = require("http");
const normalizePort = require('normalize-port');
const app = require("../app.js");
const logger = require("pino")();

const port = normalizePort(process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {logger.fatal(new Error(err))});
server.on('listening', () => console.log("acronym RESTful API server started on: " + port));

module.exports=server;

