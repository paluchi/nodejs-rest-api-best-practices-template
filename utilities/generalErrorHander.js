const logger = require("pino")(); //logger module

module.exports.GeneralErrorHander = function generalErrorHander(
  err,
  req,
  res,
  next
) {
  res.status(err.status).send(err.message);
  logger.error(err.message);
};
