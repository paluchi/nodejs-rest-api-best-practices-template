module.exports = function (app) {
  const acronymController = require("../controllers/acronym");
  const authUser = require("../controllers/auth").AuthUser;
  const validateQuery = require("./middlewares").queryValidation.validate;
  const generalErrorHander =
    require("../utilities/generalErrorHander").GeneralErrorHander;

  function validate(query, next, command) {
    const validation = validateQuery(command, query);
    if (!validation.success) {
      next(validation.data);
      return false;
    }
    return true;
  }

  // GET
  app
    .route("/item")
    .get(authUser, async (req, res, next) => {}, generalErrorHander);

  app
    .route("/folder")
    .get(authUser, async (req, res, next) => {}, generalErrorHander);

  // POST
  app.route("/item").post();

  // UPDATE
  app.route("/item").update();

  // DELETE
  app.route("/item").delete();
};
