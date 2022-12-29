//import swaggerUi from "swagger-ui-express";
import validateRequest from "./middlewares";
import { exportedMethods } from "../helpers";
import rootController from "../../controllers";

const genRouter = (Router: Function) => {
  // This router will derivate to higher level routers
  const rootRouter = Router();

  // Generate paths and docs recursively
  const buildPaths = (router: any, components: exportedMethods) => {
    components.forEach((component) => {
      // If component is of type controller
      if ("methods" in component) {
        const newRouter = Router();
        if (component.middlewares.length) newRouter.use(component.middlewares);
        buildPaths(newRouter, component.methods);
        router.use(`/${component.path}`, newRouter);
      } else {
        const { method, path, methodhandler } = component;
        router[method](`/${path}`, validateRequest(methodhandler));
      }
    });
  };

  buildPaths(
    rootRouter,
    Array.isArray(rootController) ? rootController : [rootController]
  );

  return rootRouter;
};

// const swaggerOptions = {
//   explorer: true,
//   swaggerOptions: {
//     validatorUrl: null,
//   },
// };

// Add docs route
// rootRouter.use(
//   "/api/docs",
//   (req: any, res: any, next: any) => {
//     req.originalUrl = (req.headers["x-forwarded-prefix"] || "") + req.url;
//     next();
//   },
//   swaggerUi.serve,
//   swaggerUi.setup(docs.read(), swaggerOptions)
// );

export default genRouter;
