import {
  createController,
  exportedMethods,
  createMethod,
} from "../../libraries/helpers";
import template_path from "./nested_path/template_path";

const template_path_method = createMethod(
  "get",
  "template_path",
  template_path,
  "Get metrics"
);

const methods: exportedMethods = [template_path_method];

export default createController("positions", methods);
