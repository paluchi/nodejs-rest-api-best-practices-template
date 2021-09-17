const controllers = require("../controllers");

async function updateItem({ id, name, done, folder }) {
  return await controllers.item.update(id, name, done, folder);
}

module.exports = updateItem;
