import Joi from "joi";
import { user } from "../../services";
import { IStatus, success, failure } from "../../libraries/utilities/status";
import { beInsideOperatingTenant } from "./policies";
import { restrictByRoles } from "../policies/policies";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../libraries/helpers";

// ---------------- Declare 200 status response data structure
interface IResult {
  nest_1: { nest_3: { nest_5: string } };
  nest_2: { nest_4: number };
}

// ---------------- Declare handler parameters with 'Promise<IStatus>' as return
type IAddToTenant = (params: {
  tenantName: string;
  username: string;
}) => Promise<IStatus>;

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({
    tenantName: Joi.string().required().description("Name of tenant"),
    username: Joi.string().required().description("Username of user"),
  }),
});

// ----------------  Add method handler code
export const addToTenant: IAddToTenant = async ({ tenantName, username }) => {
  try {
    await user.addToTenant(tenantName, username);

    return success<IResult>({
      nest_1: { nest_3: { nest_5: "string" } },
      nest_2: { nest_4: 3 },
    });
  } catch (error) {
    return failure(500, "error");
  }
};

// ----------------  create auth policies
const authPolicies = createAuthPolicies([
  restrictByRoles(["admin"]),
  beInsideOperatingTenant,
]);

// ----------------  create method handler
const methodHandler = createMethodHandler<IResult>(
  addToTenant,
  authPolicies,
  validation
);

// ----------------  Return method handler
export default methodHandler;
