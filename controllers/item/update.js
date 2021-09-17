const DB_connection = require("mysql").connection;
const logger = require("pino")();
const { status } = require("../../utilities");

async function updateItem( id, name, done, folder ) {
  let nameQ = "";
  let doneQ = "";
  let folderQ = "";
  if (name !== undefined) nameQ = `name = "${name}",`;
  if (done !== undefined) doneQ = `name = "${done}",`;
  if (folder !== undefined) folderQ = `folder = "${folder}"`;
  try {
    const item =
      await DB_connection.query(`UPDATE item SET ${nameQ} ${doneQ} ${folderQ} 
    WHERE
    id = ${id};`);
    return status(true, "Item updated successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = updateItem;
