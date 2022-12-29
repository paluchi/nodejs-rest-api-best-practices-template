import express, { Application, Response, NextFunction } from "express";

// This file configures request allowed parameters and policies
// This file must be modified depending on the framework used for the api
const requestConfig = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // To prevent cors errors
  app.use((_, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*"); // All web pages can access this api
    res.header("Access-Control-Allow-Headers", "*"); // Headers that can be appended
    res.header("Access-Control-Allow-Methods", "*"); // Methods that can be sent (get, post, delete, etc)
    next();
  });
};

export default requestConfig;
