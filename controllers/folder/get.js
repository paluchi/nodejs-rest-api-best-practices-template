const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function getFolder(id) {
  try {
    const item = await DB_connection.query(
      `SELECT * FROM folder WHERE id = "${id}"`
    );
    return status(true, "Folder found successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = getFolder;
