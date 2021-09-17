const DB_connection = require("mysql").connection;
const { status } = require("../../utilities");

async function removeItem(id) {
  try {
    const item = await DB_connection.query(
      `DELETE FROM 'item' [WHERE 'id' = ${id}];`
    );
    return status(true, "Item removed successfully", { item });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = removeItem;
