const controllers = require("../controllers");

async function getFolderDirectory(id) {
  return await controllers.folder.getDirectory(id);
}

module.exports = getFolderDirectory;
