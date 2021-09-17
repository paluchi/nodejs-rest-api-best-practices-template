const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function updateFolder( id, name ) {
  try {
    const item = await DB_connection.query(`UPDATE folder SET name = "${name}" 
    WHERE
    id = ${id};`);
    return status(true, "Folder updated successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = updateFolder;
