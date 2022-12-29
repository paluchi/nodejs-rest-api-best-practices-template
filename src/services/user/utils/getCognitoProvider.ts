import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import env from "../../../env";

const region: string = env.AWS_COGNITO_REGION || "";
const accessKeyId: string = env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey: string = env.AWS_SECRET_ACCESS_KEY || "";
const sessionToken: string = env.AWS_SESSION_TOKEN || "";

const getCognitoProvider = () => {
  const provider = new CognitoIdentityProvider({
    region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      sessionToken: sessionToken,
    },
  });

  return provider;
};

export default getCognitoProvider;
