import { IAuthPolicy } from "../../libraries/policies";
import { failure, success } from "../../libraries/utilities/status";

// Deny if the user is inside the tenant is asking to operate with
export const beInsideOperatingTenant: IAuthPolicy = (
  { tenants },
  { tenantName }
) => {
  const isValid = tenants && tenants.includes(tenantName);

  const result = isValid
    ? success()
    : failure(
        false,
        `You must be part of the tenant you are trying to operate with ('${tenantName}')`
      );

  return result;
};

// Deny if the user is updating an attribute called 'roles'
export const rolesAttributeIsNotUpdated: IAuthPolicy = (_, { attributes }) => {
  const isInvalid = attributes.find(
    ({ name }: { name: string }) => name === "roles"
  );

  const result = isInvalid
    ? failure(false, `Attribute 'roles' is not a mutable attribute`)
    : success(true);

  return result;
};
