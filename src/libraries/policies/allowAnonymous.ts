import { IAuthPolicy } from ".";
import { success } from "../utilities/status";

// Allow access to anonumous user
const allowAnonymous: IAuthPolicy = ({ tenants }, { tenantName }) => {
  return success();
};

export default allowAnonymous;
