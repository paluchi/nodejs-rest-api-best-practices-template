const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function addItem(name, folder = null) {
  try {
    const item = await DB_connection.query(`INSERT INTO 'item'
    VALUES (${name}, ${false}, ${folder});`);
    return status(true, "Item added successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = addItem;
