const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function getItem(id) {
  try {
    const item = await DB_connection.query(
      `SELECT * FROM item WHERE id = "${id}"`
    );
    return status(true, "Item found successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = getItem;
