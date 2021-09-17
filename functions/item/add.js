const controllers = require("../controllers");

async function addItem(itemName, parentFolderId) {
  return await controllers.item.add(itemName, parentFolderId);
}

module.exports = addItem;
