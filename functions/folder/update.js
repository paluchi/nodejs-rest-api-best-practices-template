const controllers = require("../controllers");

async function updaterFolder(id) {
  return await controllers.folder.update(id);
}

module.exports = updaterFolder;
