import { failure, success } from "../../libraries/utilities/status";
import { IAuthPolicy } from "../../libraries/policies";
import { IRole } from "./roles";

type IRestrictByRoles = (roles: IRole | IRole[]) => IAuthPolicy;

export const restrictByRoles: IRestrictByRoles = (roles) => {
  const parsedRoles = Array.isArray(roles) ? roles : [roles];

  const validateRoles: IAuthPolicy = ({ roles: userRoles }) => {
    // If user has not a role asigned
    if (!userRoles || !userRoles.length) return failure(403, "Forbidden");

    const isValid = parsedRoles.find(
      (role) => userRoles && userRoles.includes(role)
    );

    if (isValid) return success();
    return failure(403, "Forbidden");
  };

  return validateRoles;
};
