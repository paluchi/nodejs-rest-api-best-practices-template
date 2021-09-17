const controllers = require("../controllers");

async function getFolderInfo(id) {
  return await controllers.folder.get(id);
}

module.exports = getFolderInfo;
