import { RequestHandler } from "express";
import { failure } from "../../../libraries/utilities/status";
import { get_partner } from "../../../services/partner/get_partner";

const loadAuthorizationContextByApiKey: RequestHandler = async (
  req,
  _,
  next
) => {
  const user = req.user;

  const apiKey = req.headers["x-api-key"] as string | undefined;

  if (!user || !apiKey) {
    next();
    return;
  }

  try {
    const { tenant_id }: any = await get_partner({ api_key: apiKey });
    if (!tenant_id)
      throw new Error(
        "header 'x-api-key' could not be paired to a valid tenant index"
      );

    req.user = {
      ...user,
      currentTenant: { tenantId: tenant_id },
      roles: ["admin"],
    };

    next();
  } catch (error: any) {
    next(failure(401, error).data);
  }
};
export default loadAuthorizationContextByApiKey;
