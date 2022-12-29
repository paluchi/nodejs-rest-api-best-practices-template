import { RequestHandler } from "express";
import queryValidate from "../../requestValidation";
import { IMethodhandler } from "../../helpers";
import { validateAuthPolicies } from "../../policies";

type IValidateRequest = (controller: IMethodhandler) => RequestHandler[];

// This function handle the request's query and authorization validation, then the callback call based in given parameters
export const validateRequest: IValidateRequest = ({
  handler: callback,
  policies,
  validation,
}) => {
  // 'validateQuery' is in charge of validating every request based on it's query and body parameters and a command declared in the prev. route
  const validateQuery: RequestHandler = async (req, _, next) => {
    if (!validation) {
      next();
    } else {
      let error: any;
      let data: any = {};
      for (let i = 0; i < validation.length; i++) {
        let result;
        switch (validation[i].resource) {
          case "query":
            result = queryValidate(req.query, validation[i].schema);
            data = { ...data, ...result.data };
            break;
          case "header":
            result = queryValidate(req.headers, validation[i].schema, true);
            data["reqCookies"] = { ...data["reqCookies"], ...result.data };
            break;
          case "cookie":
            result = queryValidate(req.cookies, validation[i].schema, true);
            data["reqHeaders"] = { ...data["reqHeaders"], ...result.data };
            break;
          case "body":
            result = queryValidate(req.body, validation[i].schema);
            data = { ...data, ...result };
            break;
        }

        if (!result.success) {
          error = result.data;
          break;
        }
      }

      if (error) next(error);
      else {
        // Save validated request parameters in the request
        req.requestData = data;
        next();
      }
    }
  };

  // 'validateAuthorization' is in charge of validate all the needed permissions depending on the user roles and the route policies
  const validateAuthorization: RequestHandler = async (req, _, next) => {
    // 'requestData' comes from prev. middleware
    // 'user' comes from authentication 'jwt' middleware used in 'router' index file
    const { requestData, user } = req;

    // Validate route call based on user parameters, request parameters and the route url
    const { success, data } = validateAuthPolicies(policies, user, requestData);

    next(!success && data);
  };

  // 'runCallback' is in charge of calling the callback and send it the validated request parameters and the user attributes
  const runCallback: RequestHandler = async (req, res, next) => {
    const response = await callback({
      ...req.requestData,
      user: req.user,
    });

    if (!response.success) next(response.data);
    else res.json(response.data);
  };

  // The prev. mentioned middlewares will be executed in declared order.
  const middlewares = [validateQuery, validateAuthorization, runCallback];

  return middlewares;
};

export default validateRequest;
