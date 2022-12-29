import { RequestHandler } from "express";
import { failure } from "../../../libraries/utilities/status";
import { anonymousAuthorizationMethod } from "../../../libraries/policies";

const authorizarionContextValidation: RequestHandler = async (req, _, next) => {
  const user = req.user;

  const apiKey = req.headers["x-api-key"] as string | undefined;
  const jwt: string = req.headers["authorization"] as string;
  const tenantIndex = req.headers["x-tenant-index"] as any;

  try {
    if ((apiKey && jwt) || (jwt && !tenantIndex)) {
      throw new Error("bad authorization method");
    }

    next();
  } catch (error: any) {
    next(failure(401, error).data);
  }
};
export default authorizarionContextValidation;
