const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function getRoute(id = 0) {
  try {
    const folder = await DB_connection.query(
      `SELECT * FROM folder WHERE id = "${id}"`
    );
    const folderItems = await DB_connection.query(
      `SELECT * FROM item WHERE folder_id = "${id}"`
    );
    const folderFolders = await DB_connection.query(
      `SELECT id FROM folder WHERE folder_id = "${id}"`
    );
    const root = {
      ...folder,
      items: folderItems,
      folders: folderFolders.map(async (folder) => await getRoute(folder.id))
        .data.directory,
    };
    return status(true, "Directory has been gotten successfully", {
      root,
    });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = getRoute;
