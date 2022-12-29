import Joi from "joi";
import { user } from "../../services";
import { IStatus, success, failure } from "../../libraries/utilities/status";
import { rolesAttributeIsNotUpdated } from "./policies";
import { restrictByRoles } from "../policies/policies";
import { ALL_ROLES } from "../policies/roles";
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
type IUpdateProperties = (params: {
  attributes: any[];
  user: any;
}) => Promise<IStatus>;

// ----------------  Create validation rules
const validationRules = createValidationRules({
  resource: "body",
  schema: Joi.object({
    attributes: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required(),
        })
      )
      .required(),
  }).required(),
});

// ----------------  Add method handler code
export const updateProperties: IUpdateProperties = async ({
  user: userData,
  attributes,
}) => {
  try {
    await user.updateAttributes(userData.username, attributes);
    return success<IResult>({
      nest_1: { nest_3: { nest_5: "string" } },
      nest_2: { nest_4: 3 },
    });
  } catch (error) {
    return failure(500, "error");
  }
};

// ----------------  Create auth policies
const authPolicies = createAuthPolicies([
  restrictByRoles(ALL_ROLES),
  rolesAttributeIsNotUpdated,
]);

// ----------------  Create method handler
const methodhandler = createMethodHandler<IResult>(
  updateProperties,
  authPolicies,
  validationRules
);

// ----------------  Return method handler
export default methodhandler;
