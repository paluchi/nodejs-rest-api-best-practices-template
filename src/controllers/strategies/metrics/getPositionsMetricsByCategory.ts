import { IStatus, success, failure } from "../../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../../libraries/helpers";

import { get_partner } from "../../../services/partner/get_partner";
import { default as getMetricsService } from "../../../services/metric/getPositionsMetrics";

import Joi from "joi";

interface IResult {
  metrics: any;
}

type IGetPositionsMetricsByCategory = (params: {
  user: any;
  category: string;
}) => Promise<IStatus>;

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({}),
});

export const getPositionsMetricsByCategory: IGetPositionsMetricsByCategory =
  async (params) => {
    const { user } = params;
    try {
      const tenant_id = user.currentTenant.tenantId;
      const partners = await get_partner({ tenant_id });

      if (!partners) return failure(400, "Partner not found");

      const metrics = await getMetricsService(partners.tenant_id);
      const parsedMetrics = parseCategories(metrics);

      return success<IResult>({ metrics: parsedMetrics });
    } catch (error) {
      console.log("An error occurred: ", error);
      return failure(500, "error");
    }
  };

// ----------------  create auth policies
const authPolicies = createAuthPolicies([]);

// ----------------  create method handler
const methodHandler = createMethodHandler<IResult>(
  getPositionsMetricsByCategory,
  authPolicies,
  validation
);

// ----------------  Return method handler
export default methodHandler;

const parseCategories = (metrics: any[]) => {
  const newMetrics: any = { categories: metrics };

  const all: any = { timestamps: [], distribution: {}, summary: {} };
  metrics.forEach((metric) => {
    const total_net_amount_usd = Object.keys(metric.data).reduce(
      (reduced, category) => {
        reduced += metric.data[category].net_amount_usd;
        return reduced;
      },
      0
    );

    const allMetric: any = {
      unrealized_returns: 0,
      all_unrealized_returns: {},
    };
    for (const [
      category,
      { unrealized_returns, net_amount_usd },
    ] of Object.entries(metric.data) as any) {
      allMetric["unrealized_returns"] +=
        unrealized_returns * (net_amount_usd / total_net_amount_usd);
      allMetric["all_unrealized_returns"][category] = unrealized_returns;
    }
    all.timestamps.push({ data: allMetric, metric_date: metric.metric_date });
  });

  const lastMetric = metrics.at(-1);
  const total_net_amount_usd: number = (
    Object.entries(lastMetric?.data || {}) as any
  ).reduce(
    (reduced: number, [_, { net_amount_usd }]: any) => reduced + net_amount_usd,
    0
  );
  for (const [
    category,
    { net_amount_usd, net_amount, deployed_amount, accumulated_returns },
  ] of Object.entries(lastMetric?.data || {}) as any) {
    all.distribution[category] = net_amount_usd / total_net_amount_usd;
    all.summary[category] = {
      net_amount_usd,
      net_amount,
      deployed_amount,
      accumulated_returns,
    };
  }

  newMetrics["all"] = all;

  return newMetrics;
};
