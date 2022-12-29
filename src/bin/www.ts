import * as http from "http"; // Using http to create server
import app from "../app";
import env from '../env';

const projectName = "Quant Portal Services";

// Use API_PORT if exists in environment or use 3000 as port
const port: number = env.API_PORT;

// Create server
const server: http.Server = http.createServer(app);

// Open server
server.listen(port);

// Handle server errors
server.on("error", (err: string) => {
  console.log(err);
  throw new Error(err);
});

server.on("listening", () =>
  console.log(`${projectName} API server started on: 127.0.0.1:${port}`)
);
