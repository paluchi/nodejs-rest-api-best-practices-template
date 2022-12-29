import { failure, IStatus, success } from "../../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../../libraries/helpers";
import Joi from "joi";
import allowAnonymous from "../../../libraries/policies/allowAnonymous";

type IGetSummaryProperties = (params: {
  variable_1: number;
  variable_2: string;
}) => Promise<IStatus>;

interface ISucess {
  variable_1: number;
  variable_2: string;
}

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({
    variable_1: Joi.number().required().description("Some number"),
    variable_2: Joi.string().required().description("Some string"),
  }),
});

export const template_path: IGetSummaryProperties = async ({
  variable_1,
  variable_2,
}) => {
  try {
    if (false) return failure(500, `error text`, { code: "some_code" });
    else {
      return success<ISucess>({
        variable_1,
        variable_2,
      });
    }
  } catch (error) {
    console.log("An error occurred: ", error);
    return failure(500, "error");
  }
};

const authPolicies = createAuthPolicies([allowAnonymous]);

const methodhandler = createMethodHandler<ISucess>(
  template_path,
  authPolicies,
  validation
);

export default methodhandler;
