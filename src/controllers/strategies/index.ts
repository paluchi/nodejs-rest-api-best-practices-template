import { createController, exportedMethods } from "../../libraries/helpers";
import metricsController from "./metrics";
import integrationsController from "./integrations";

const methods: exportedMethods = [metricsController, integrationsController];

export default createController("strategies", methods);
