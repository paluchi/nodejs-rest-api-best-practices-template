import { AdminUpdateUserAttributesCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import getCognitoProvider from "./utils/getCognitoProvider";
import parseAttributes, { IAttribute } from "./utils/parseCognitoAttributes";
import env from "../../env";

const userPoolId: string = env.AWS_COGNITO_USER_POOL_ID || "";

const provider = getCognitoProvider();

const updateAttributes = async (username: string, attributes: IAttribute[]) => {
  const params: AdminUpdateUserAttributesCommandInput = {
    UserAttributes: parseAttributes(attributes),
    Username: username,
    UserPoolId: userPoolId,
  };
  return await provider.adminUpdateUserAttributes(params);
};

export default updateAttributes;
