const controllers = require("../controllers");

async function getRootDirectory() {
  return await controllers.folder.getDirectory(0);
}

module.exports = getRootDirectory;
