import http from "node:http";
import requestHandler from "./routes.js";

const server = http.createServer(requestHandler);

server.listen(8000);
