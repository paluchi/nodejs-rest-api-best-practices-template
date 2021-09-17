const express = require("express");
const logger = require("pino")(); //logger module

module.exports = async function expressLoader(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //to prevent cors errors
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //all web pages can access this api
    res.header("Access-Control-Allow-Headers", "*"); //headers that can be appended
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "*"); //methods that can be sent (get, post, delete, etc)
    }
    next();
  });

  return app;
};
