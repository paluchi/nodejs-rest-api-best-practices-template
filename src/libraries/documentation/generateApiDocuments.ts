//import swaggerUi from "swagger-ui-express";
import docsGenerator, {
  IInfo,
  IServer,
  ISecurity,
  IComponent,
  IDocument,
  IDocPath,
} from "./ApiDocumentsGenerator";
import { exportedMethods } from "../helpers";
import rootController from "../../controllers";

type IGenerateTemplate = ({
  openApiVersion,
  info,
  servers,
  security,
}: {
  openApiVersion: string;
  info: IInfo;
  servers?: IServer[];
  security?: ISecurity[];
  components?: IComponent;
  paths?: IDocPath;
}) => IDocument;

export const generateTemplate: IGenerateTemplate = ({
  openApiVersion,
  info,
  servers,
  security,
  components,
  paths,
}) => {
  return {
    openapi: openApiVersion,
    info: info,
    servers: servers,
    security: security,
    components: components,
    paths: paths || {},
  };
};

const generateApiDocumentation = (
  apiDocsRoute: string,
  template?: IDocument
) => {
  const docs = new docsGenerator(template);
  // This router will derivate to higher level routers

  // Generate paths and docs recursively
  const buildPaths = (components: exportedMethods, prefix: string = "/") => {
    components.forEach((component) => {
      // If component is of type controller
      if ("methods" in component) {
        buildPaths(component.methods, `/${component.path}`);
      } else {
        const { method, path, methodhandler, description } = component;
        if (methodhandler.validation) {
          const { responseType, validation: validation } = methodhandler;
          const data = {
            method,
            path,
            specs: {
              responseType,
              validation,
            },
          };
          docs.generateDocsPath(prefix, description, data);
        }
      }
    });
  };

  buildPaths(Array.isArray(rootController) ? rootController : [rootController]);

  docs.save(apiDocsRoute);
};

export default generateApiDocumentation;
