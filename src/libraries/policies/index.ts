import { failure, success, IStatus, IFailure } from "../utilities/status";
import { IAuthPolicies } from "../helpers";
import allowAnonymous from "./allowAnonymous";

type IValidateAuthPolicies = (
  authorization: IAuthPolicies,
  userData: any,
  requestData: any
) => IStatus;

export type IAuthPolicy = (userData: any, requestData: any) => IStatus;

export const anonymousAuthorizationMethod = "requests-anonymous";

// This function is in charge on the user's request's authorization validation
// Validation is rejected by default to prevent hacking by malfunction code
export const validateAuthPolicies: IValidateAuthPolicies = (
  { policies },
  userData,
  requestData
) => {
  if (policies.includes(allowAnonymous))
    return allowAnonymous(userData, requestData);

  // If user data is not given validation can't be made, then request is rejected
  // This can happend only by malfuntioning code. preferent authentication middlewares are in charge of filling the user data
  if (!userData)
    return failure(405, "You are not authorized to make this operation");

  // If specific allowment criteria function is declared in policies then check it too
  if (policies && policies.length) {
    const errors: IFailure[] = [];
    policies.forEach((policyfn) => {
      const validation = policyfn(userData, requestData);
      if (!validation.success) errors.push(validation);
    });

    if (errors.length) {
      const errorMessages = errors.reduce(
        (reduced, error) => `${reduced}${error}\n`,
        "You are not authorized to do this.\n"
      );
      return failure(405, errorMessages);
    }
  } else {
    // If the route policies were not found then the developer forgot to code them or allow anonymous access.
    failure(500, "There was a problem searching for your policies");
  }

  // If this line is executed then then user exists, it's role is valid and specific allowment criteria is not needed to allow access. Retrieve access to function
  return success();
};
