const mysql = require("mysql");
const logger = require("pino")(); //logger module

async function DBLoader() {
  try {
    const connection = await mysql
      .createConnection({
        host: `${process.env.DB_HOST}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_DATABASE}`,
      })
      .connect();

    logger.info("db connected");

    return connection;
  } catch (error) {
    logger.fatal("db can't be reached, ERROR: " + err);
  }
}

module.exports = DBLoader;
