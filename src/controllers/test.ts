import { failure, IStatus, success } from "../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../libraries/helpers";
// import allowAnonymous from "../libraries/policies/allowAnonymous";
import Joi from "joi";

type IGetSummaryProperties = (params: { user: any }) => Promise<IStatus>;

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({
    // position: Joi.string().required().description("ID of the position"),
  }),
});

interface IResponse {
  test: "ok";
}

export const test: IGetSummaryProperties = async ({ user }) => {
  try {
    const result: IResponse = { test: "ok" };

    return success<IResponse>(result);
  } catch (error) {
    console.log("An error occurred: ", error);
    return failure(500, "error");
  }
};

const authPolicies = createAuthPolicies([]);

const methodhandler = createMethodHandler<IResponse>(
  test,
  authPolicies,
  validation
);

export default methodhandler;
