import * as dotenv from "dotenv"; // Loads .env variables as environment variables
import morgan from "morgan"; // Fancy request logging module
import express, { Application, Router } from "express"; // Express as web framework
// import loadRequestConfig from "./requestConfig"; // Used to set allowed request parameters and policies
import generalErrorhandler from "./utils/generalErrorhandler"; // Used to handle errors at last step of request pipeline
import cors from "cors"; // Allow cors
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export interface IUser {
  jwt?: string;
  jwtType?: string;
  username?: string;
  tenants?: string[];
  roles: string[];
  email?: string;
  name?: string;
  emailVerified?: boolean;
  currentTenant: { tenantId: string };
}

dayjs.extend(utc);

// Must be loaded before router
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import runLoaders from "./loaders";
import routerFactory from "./libraries";

// Catch unhanded promise errors
process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection: ${error}`);
});

// Load express express and commong middlewares
const app: Application = express();

// Stablish allowed headers, methods and cors policy
app.use(cors());
// loadRequestConfig(app);

// Use morgar for router request logging
app.use(morgan("dev"));

// Loads functional libraries
runLoaders();

// Generate routes
const router = routerFactory.genRouter(Router);

// Add routes
app.use(router);

// Error handler middleware
app.use(generalErrorhandler);

export default app;
