const controllers = require("../controllers");

async function removeFolder(id) {
  return await controllers.folder.remove(id);
}

module.exports = removeFolder;
