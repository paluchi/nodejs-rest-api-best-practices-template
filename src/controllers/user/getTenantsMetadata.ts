import Joi from "joi";
import { IStatus, success, failure } from "../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../libraries/helpers";
import { get_partner } from "../../services/partner/get_partner";
import { IUser } from "../../app";

interface ITenants {
  [id: string]: { name: string };
}

// ---------------- Declare 200 status response data structure
interface IResult {
  tenants: ITenants;
}

// ---------------- Declare handler parameters with 'Promise<IStatus>' as return
type IAddToTenant = (params: { user: IUser }) => Promise<IStatus>;

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({}),
});

// ----------------  Add method handler code
export const getTenantsMetadata: IAddToTenant = async ({ user }) => {
  try {
    const tenant_id = user.currentTenant.tenantId;
    const partner = await get_partner({ tenant_id });
    if (!partner) return failure(400, "Partner not found");

    const tenants: ITenants = {};
    for (let i = 0; i < user.tenants!.length; i++) {
      const partner = await get_partner({ tenant_id: user.tenants![i] });
      tenants[user.tenants![i]] = { name: partner.name };
    }

    return success<IResult>({ tenants });
  } catch (error) {
    return failure(500, "error");
  }
};

// ----------------  create auth policies
const authPolicies = createAuthPolicies([]);

// ----------------  create method handler
const methodHandler = createMethodHandler<IResult>(
  getTenantsMetadata,
  authPolicies,
  validation
);

// ----------------  Return method handler
export default methodHandler;
