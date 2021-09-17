const logger = require("pino")(); //logger module
const expressLoader = require("./express");
const DBLoader = require("./DBLoader");

module.exports = function init(expressApp) {
  const connection = DBLoader();
  logger.info("db Intialized");
  expressLoader(expressApp);
  logger.info("Express Intialized");
};
