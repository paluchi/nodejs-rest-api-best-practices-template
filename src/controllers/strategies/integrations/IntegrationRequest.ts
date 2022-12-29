import Joi from "joi";
import { IStatus, success, failure } from "../../../libraries/utilities/status";
import {
  createAuthPolicies,
  createMethodHandler,
  createValidationRules,
} from "../../../libraries/helpers";

import { get_partner } from "../../../services/partner/get_partner";
import sendIntegrationRequest from "../../../services/strategy/sendIntegrationRequest";

interface IResult {
  success: boolean;
}

type IIntegrationRequest = (params: {
  user: any;
  strategy_id: string;
  tokens: string[];
  amount: number;
}) => Promise<IStatus>;

// ----------------  create validation rules
const validation = createValidationRules({
  resource: "query",
  schema: Joi.object({
    strategy_id: Joi.string().required().description("ID of the strategy"),
    tokens: Joi.array()
      .items(Joi.string())
      .required()
      .description("Tokens of the strategy"),
    amount: Joi.number()
      .required()
      .description("Amount of money to add into this integration"),
  }),
});

export const integrationRequest: IIntegrationRequest = async ({
  user,
  strategy_id,
  tokens,
  amount,
}) => {
  try {
    const tenant_id = user.currentTenant.tenantId;
    const partner = await get_partner({ tenant_id });
    if (!partner) return failure(400, "Partner not found");

    const hasBeenRequested = await sendIntegrationRequest(
      partner,
      strategy_id,
      tokens,
      amount
    );

    if (hasBeenRequested) return success<IResult>({ success: true });
    else throw new Error("Request could not be sent");
  } catch (error) {
    return failure(500, "Integration request failed");
  }
};

const authPolicies = createAuthPolicies([]);

const methodhandler = createMethodHandler<IResult>(
  integrationRequest,
  authPolicies,
  validation
);

export default methodhandler;
