import { AdminAddUserToGroupCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import getCognitoProvider from "./utils/getCognitoProvider";
import env from "../../env";

const userPoolId: string = env.AWS_COGNITO_USER_POOL_ID || "";

const provider = getCognitoProvider();

const addToTenant = async (tenantName: string, username: string) => {
  const params: AdminAddUserToGroupCommandInput = {
    GroupName: tenantName,
    Username: username,
    UserPoolId: userPoolId,
  };
  await provider.adminAddUserToGroup(params);
  return "User Added successfully to group";
};

export default addToTenant;
