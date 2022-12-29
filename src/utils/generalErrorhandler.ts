import { ErrorRequestHandler } from "express";

// Just print error and send status and message to client. Could locate a lot of distincs logics for last step in process (like send data to metrics system).
const generalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("generalErrorhandler: " + err, err.stack);

  res.status(err.status).json(err);
};

export default generalErrorhandler;
