import { IStatus, success, failure } from "../../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
} from "../../../libraries/helpers";

import { get_partner } from "../../../services/partner/get_partner";
import getMetricsService from "../../../services/metric/getPositionsMetrics";

interface IResult {
  metrics: any;
}

type IGetPositionsMetrics = (params: { user: any }) => Promise<IStatus>;

export const getPositionsMetrics: IGetPositionsMetrics = async ({ user }) => {
  try {
    const tenant_id = user.currentTenant.tenantId;
    const partners = await get_partner({ tenant_id });

    if (!partners) return failure(400, "Partner not found");

    const metrics: any = await getMetricsService(partners.tenant_id);

    return success<IResult>({ metrics });
  } catch (error) {
    console.log("An error occurred: ", error);
    return failure(500, "error");
  }
};

const authPolicies = createAuthPolicies([]);

const methodhandler = createMethodHandler<IResult>(
  getPositionsMetrics,
  authPolicies
);

export default methodhandler;
