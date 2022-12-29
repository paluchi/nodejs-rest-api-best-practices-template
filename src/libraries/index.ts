import genRouter from "./router";
import generateApiDocumentation, {
  generateTemplate as generateApiDocumentationTemplate,
} from "./documentation";
import * as helpers from "./helpers";
import * as status from "./utilities/status";

// Expland express request content adding new types
declare global {
  namespace Express {
    interface Request {
      user: {
        [key: string]: any;
      };
      requestData: { [key: string]: any };
    }
  }
}

const routerFactory = {
  genRouter,
  generateApiDocumentation,
  generateApiDocumentationTemplate,
  helpers,
  status,
};

export default routerFactory;
