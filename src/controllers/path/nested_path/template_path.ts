import { failure, IStatus, success } from "../../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../../libraries/helpers";
import Joi from "joi";

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
    varfiable_1: Joi.number().required().description("Some number"),
    varfiable_2: Joi.string().required().description("Some string"),
  }),
});

export const get_metrics: IGetSummaryProperties = async ({
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

const authPolicies = createAuthPolicies([]);

const methodhandler = createMethodHandler<any>(
  get_metrics,
  authPolicies,
  validation
);

export default methodhandler;
