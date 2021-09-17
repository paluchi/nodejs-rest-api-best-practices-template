const DB_connection = require("mysql").connection;
const { status } = require("../../utilities");
const removeItem = require("../item/remove");
const getFolderItems = require("./get");

async function removeFolder(id) {
  try {
    // Find all items
    const FIReq = await getFolderItems(id);
    if (!FIReq.success) return status(false, FIReq.message);
    const folderItems = FIReq.data.items;

    // Delete all items
    await Promise.all(folderItems.map((itemId) => removeItem(itemId)));

    // Delete folder
    const folder = await DB_connection.query(
      `DELETE FROM 'folder' [WHERE 'id' = ${id}];`
    );
    return status(true, "Folder and inner items successfully removed", {
      folder,
    });
  } catch (error) {
    logger.fatal(error);
    return status(false, error);
  }
}

module.exports = removeFolder;
