import {
  createController,
  createMethod,
  exportedMethods,
} from "../../../libraries/helpers";
import getPositionsMetrics from "./getPositionsMetrics";
import getPositionsMetricsByCategory from "./getPositionsMetricsByCategory";

const method_get_metrics_by_category = createMethod(
  "get",
  "positions",
  getPositionsMetricsByCategory,
  "Get positions metrics by asset category"
);
const method_get_all_metrics = createMethod(
  "get",
  "positions/all",
  getPositionsMetrics,
  "Get all positions metrics"
);

const methods: exportedMethods = [
  method_get_metrics_by_category,
  method_get_all_metrics,
];
export default createController("metrics", methods);
