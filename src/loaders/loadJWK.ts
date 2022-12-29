import fs from "fs";
import axios from "axios";
import env from "../env";

const region: string = env.AWS_COGNITO_REGION as string;
const userPoolId: string = env.AWS_COGNITO_USER_POOL_ID as string;
const jwkFileRoute: string = `${env.TMP}/${env.COGNITO_JWK_FILE}`;

const saveJWK = (jwk: object) => {
  let data = JSON.stringify(jwk);

  fs.writeFile(jwkFileRoute, data, { flag: "w" }, (err: any) => {
    if (err) throw new Error(err);
  });
};

const loadJWK = async () => {
  try {
    if (!region || !userPoolId)
      throw new Error(
        "'AWS_COGNITO_REGION' or 'AWS_COGNITO_USER_POOL_ID' is missing in environment variables"
      );
    const res = await axios.get(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    );

    await saveJWK(res.data);
  } catch (error: any) {
    console.log(`The was an error loading the Json Web Key (JWK). ${error}`);
    throw new Error(error);
  }
};

export default loadJWK;
