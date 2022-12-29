export interface Env {
  API_PORT: number;
  TMP: string;
  COGNITO_JWK_FILE: string | undefined;
  API_DOCUMENTS_FILE: string | undefined;
  WEB_APP_URL: string | undefined;
  AWS_COGNITO_USER_POOL_ID: string | undefined;
  AWS_COGNITO_CLIENT_ID: string | undefined;
  AWS_COGNITO_CLIENT_SECRET: string | undefined;
  AWS_COGNITO_REGION: string | undefined;
  AWS_ACCESS_KEY_ID: string | undefined;
  AWS_SECRET_ACCESS_KEY: string | undefined;
  AWS_SESSION_TOKEN: string | undefined;
  AWS_REGION: string | undefined;
  ITB_ANALYTICS_API_URL: string | undefined;
  TENANTS_TABLE: string;
  TOKENS_TABLE: string;
  BLOCKCHAINS_TABLE: string;
  STRATEGIES_TABLE: string;
  METRICS_TABLE: string;
  POSITION_METRICS_TABLE: string;
  METADATA_TABLE: string;
  NODE_ENV: string;
  INTEGRATIONS_TOPIC: string;
  INTEGRATIONS_TOPIC_OWNER: string;
}

const env: Readonly<Env> = {
  API_PORT: process.env.API_PORT ? parseInt(process.env.API_PORT) : 7000,
  TMP: process.env.TMP ? process.env.TMP : "/tmp",
  COGNITO_JWK_FILE: process.env.COGNITO_JWK_FILE,
  API_DOCUMENTS_FILE: process.env.COGNITO_JWK_FILE,
  WEB_APP_URL: process.env.WEB_APP_URL,
  AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_CLIENT_SECRET: process.env.AWS_COGNITO_CLIENT_SECRET,
  AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
  AWS_REGION: process.env.AWS_REGION,
  ITB_ANALYTICS_API_URL: process.env.ITB_ANALYTICS_API_URL,
  TENANTS_TABLE: process.env.TENANTS_TABLE || "",
  TOKENS_TABLE: process.env.TOKENS_TABLE || "",
  BLOCKCHAINS_TABLE: process.env.BLOCKCHAINS_TABLE || "",
  STRATEGIES_TABLE: process.env.STRATEGIES_TABLE || "",
  METRICS_TABLE: process.env.METRICS_TABLE || "",
  POSITION_METRICS_TABLE: process.env.POSITION_METRICS_TABLE || "",
  METADATA_TABLE: process.env.METADATA_TABLE || "",
  NODE_ENV: process.env.NODE_ENV || "",
  INTEGRATIONS_TOPIC: process.env.INTEGRATIONS_TOPIC || "",
  INTEGRATIONS_TOPIC_OWNER: process.env.INTEGRATIONS_TOPIC_OWNER || "",
};

export default env;
