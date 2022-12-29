import fs from "fs";
import { RequestHandler } from "express";
import { failure } from "../../../libraries/utilities/status";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import env from "../../../env";

const jwkFileRoute: string = `${env.TMP}/${env.COGNITO_JWK_FILE}`;

// Read https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html for more info

interface jwk {
  keys: any[];
}

let jwk: jwk;

const fsInterval = setInterval(() => {
  // Check is keys are available for use. If not close server by throwing error
  fs.readFile(jwkFileRoute, "utf-8", (err: any, data) => {
    if (!err) {
      jwk = JSON.parse(data);
      if (jwk) clearInterval(fsInterval);
    }
  });
}, 50);

// Validate given token payload claims
const validateClaims = (claims: any, resolve: Function, reject: Function) => {
  // Verify token expiration
  const authDate: Date = new Date(claims.auth_time * 1000);
  const expDate: Date = new Date(claims.exp * 1000);
  const currentDate: Date = new Date();

  if (expDate <= authDate || expDate < currentDate)
    reject("jwt has already expired");

  // Verify token_use
  if (claims.token_use !== "id")
    reject(
      `Provided jwt type: '${claims.token_use}'. Please provide 'id' type instead (idToken)`
    );

  resolve(claims);
};

const getJWK = (): Promise<jwk> | jwk => {
  // Return jwk if already loaded
  if (jwk) return jwk;

  // Return jwk promise if not loaded
  return new Promise((resolve, reject) => {
    const getJWKInterval = setInterval(() => {
      if (jwk) {
        clearInterval(getJWKInterval);
        resolve(jwk);
      }
    }, 50);
  });
};

type IIsValid = (accessToken: any) => any;
// Validate token certificate and call claims validation function
const isValid: IIsValid = (accessToken) => {
  return new Promise(async (resolve, reject) => {
    const decodedJWToken: any = jwt.decode(accessToken, {
      complete: true,
    });
    if (decodedJWToken) {
      const clientKid: string = decodedJWToken.header.kid;

      const JWK = await getJWK();

      for (let i = 0; i < JWK.keys.length; i++) {
        if (JWK.keys[i].kid === clientKid) {
          const pem = jwkToPem(JWK.keys[i]);
          jwt.verify(
            accessToken,
            pem,
            { algorithms: ["RS256"] },
            (err, payload) => {
              if (err) reject(err.message);
              else validateClaims(payload, resolve, reject);
            }
          );
        }
      }
    }
    reject("Invalid jwt");
  });
};

// Authenticate jwt by it's certification and claims correctness
const loadAuthorizationContextByJWT: RequestHandler = async (req, _, next) => {
  let jwt: string = req.headers["authorization"] as string;
  let tenantIndex = req.headers["x-tenant-index"] as any;

  // If jwt was not attached in 'Authorization' header then continue.
  // This could be for a reason (currently sign in testing).
  // If jwt will not be required for any call over this server then the following if must be removed from code
  if (!jwt) {
    next();
    return;
  } else if (tenantIndex === undefined) {
    next(
      failure(
        401,
        "header 'x-tenant-index' could not be paired to a valid tenant index"
      ).data
    );
    return;
  }

  // Remove 'Bearer' from string
  jwt = jwt.substring(7, jwt.length);
  tenantIndex = parseInt(tenantIndex);

  try {
    // Check if jwt is valid
    const decodedJwk = await isValid(jwt);

    const currentTenant = decodedJwk["cognito:groups"][tenantIndex];

    // If jwt is valid then save the user attributes in the request for later user
    req.user = {
      ...req.user,
      jwt: jwt,
      jwtType: decodedJwk.token_use,
      username: decodedJwk["cognito:username"],
      tenants: decodedJwk["cognito:groups"],
      roles: decodedJwk["custom:roles"]?.split(","),
      email: decodedJwk.email,
      name: decodedJwk.name,
      emailVerified: decodedJwk.email_verified,
      currentTenant: { tenantId: currentTenant },
    };

    next();
  } catch (error: any) {
    next(failure(401, error).data);
  }
};
export default loadAuthorizationContextByJWT;
