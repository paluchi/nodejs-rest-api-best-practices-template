import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import env from "../env";
import routerFactory from "../libraries";

const OpenApiVersion = "3.0.1";
const title = "template title";
const description = "template description";
const version = "0.0.1";

const url = env.WEB_APP_URL || "";

const template = routerFactory.generateApiDocumentationTemplate({
  openApiVersion: OpenApiVersion,
  info: { title, description, version },
  servers: [{ url }],
  security: [{ ApiKeyAuth: [] }],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "X-API-Key",
        in: "header",
      },
    },
  },
});
const apiDocumentsPath = `${__dirname}/${env.API_DOCUMENTS_FILE}`;

routerFactory.generateApiDocumentation(apiDocumentsPath, template);
