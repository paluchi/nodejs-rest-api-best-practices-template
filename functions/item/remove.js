const controllers = require("../controllers");

async function removeItem(id) {
  return await controllers.item.remove(id);
}

module.exports = removeItem;