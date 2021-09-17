const controllers = require("../controllers");

async function getInfo(id) {
  return await controllers.item.get(id);
}

module.exports = getInfo;
