import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import swaggerUI from "swagger-ui-express";
import routes from "./routes";
import { swaggerDocs } from "./docs";
import http from "http";
import { Server } from "socket.io";
import {
  addOnlineUser,
  disConnectUser,
  getOnlineUser,
  sendMessage,
  sendConnectionMessage,
} from "./domains/sochet";
import requestLogger from "./middlewares/request.logger";
require("./config/db");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(requestLogger);
app.use(routes);
app.use(express.static(path.join(__dirname, "/upload/images")));

app.get("/", async (req: Request, res: Response) => {
  res.sendFile(path.resolve("./src/index.html"));
});
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  addOnlineUser(socket, io);
  getOnlineUser(socket, io);
  sendMessage(socket, io);
  sendConnectionMessage(socket, io);
  getOnlineUser(socket, io);
  disConnectUser(socket, io);
});

const startServer = () => {
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};
startServer();

export default app;
