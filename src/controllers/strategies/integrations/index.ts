import {
  createController,
  createMethod,
  exportedMethods,
} from "../../../libraries/helpers";
import IntegrationRequest from "./IntegrationRequest";

const integrationRequestMethod = createMethod(
  "post",
  "request",
  IntegrationRequest,
  "Send an integration request for a strategy"
);

const methods: exportedMethods = [integrationRequestMethod];

export default createController("integrations", methods);
