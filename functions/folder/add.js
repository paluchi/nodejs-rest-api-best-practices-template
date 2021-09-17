const controllers = require("../controllers");

async function addFolder(folderName, parentFolderId) {
  return await controllers.folder.add(folderName, parentFolderId);
}

module.exports = addFolder;
