const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function addFolder(name) {
  try {
    const folder = await DB_connection.query(`INSERT INTO 'folder'
    VALUES (${name});`);
    return status(true, "Folder added successfully", { folder });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = addFolder;
