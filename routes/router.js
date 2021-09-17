const authUser = require("../controllers/auth").AuthUser;
const functions = require("../functions");
const QVal = require("./middlewares");
const { generalErrorHander } = require("../utilities/generalErrorHander");

function validate(query, next, command) {
  const validation = QVal.validate(command, query);
  if (!validation.success) {
    next(validation.data);
    return false;
  }
  return true;
}

function router(app) {
  // GET
  app.route("/item").get(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.GET_ITEM,
          functions.item.get
        )
      );
    },
    generalErrorHander
  );

  app.route("/folder").get(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.GET_FOLDER,
          functions.folder.get
        )
      );
    },
    generalErrorHander
  );

  app.route("/directory").get(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.GET_DIRECTORY,
          functions.folder.getDirectory
        )
      );
    },
    generalErrorHander
  );

  app.route("/root").get(
    authUser,
    async (req, res, next) => {
      res.json(await functions.folder.getRoot());
    },
    generalErrorHander
  );

  // POST
  app.route("/item").post(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.ADD_ITEM,
          functions.item.add
        )
      );
    },
    generalErrorHander
  );

  app.route("/folder").post(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.ADD_FOLDER,
          functions.folder.add
        )
      );
    },
    generalErrorHander
  );

  // UPDATE
  app.route("/item").update(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.UPDATE_ITEM,
          functions.item.update
        )
      );
    },
    generalErrorHander
  );

  app.route("/folder").update(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.UPDATE_FOLDER,
          functions.folder.update
        )
      );
    },
    generalErrorHander
  );

  // DELETE
  app.route("/item").delete(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.REMOVE_ITEM,
          functions.item.remove
        )
      );
    },
    generalErrorHander
  );

  app.route("/folder").delete(
    authUser,
    async (req, res, next) => {
      res.json(
        await validate(
          req.query,
          next,
          QVal.commands.REMOVE_FOLDER,
          functions.folder.remove
        )
      );
    },
    generalErrorHander
  );
}

module.exports = router;
