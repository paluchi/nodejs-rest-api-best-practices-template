import { createMethod, exportedMethods } from "../libraries/helpers";
import { createController } from "../libraries/helpers";
import pathController from "./path";
import test from "./test";

// Middlewares
// import authorizarionContextValidation from "./middlewares/authorization/authorizarionContextValidation";
// import loadAuthorizationContextByJWT from "./middlewares/authorization/loadAuthorizationContextByJWT";

const testMethod = createMethod(
  "get",
  "test",
  test,
  "testing allowAnonimous fn"
);

// Firstly check that a jwt has been added in 'Authentication' header and validate it's values
const controllers: exportedMethods = [pathController, testMethod];

export default createController(null, controllers, [
  // authorizarionContextValidation,
  // loadAuthorizationContextByJWT,
]);
