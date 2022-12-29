import dotenv from "dotenv";
import env from "../env";

if (env.NODE_ENV !== "production") {
  dotenv.config();
}

import routerFactory from "../libraries";

const OpenApiVersion = "3.0.1";
const title = "Service provider for Quant users.";
const description =
  "This API is in charge of providing Quant product´s users the capability of interacting with the full set of Quant applications according to their account properties and request parameters.";
const version = "0.0.1";
const url = env.WEB_APP_URL || "https://app.quant.intotheblock.io";

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
