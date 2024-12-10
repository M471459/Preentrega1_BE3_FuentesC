import express from "express";
import passport from "passport";
import { connectMongoDB } from "./config/mongoDB.config.js";
import config from "./config/env.config.js";
import router from "./router/index.router.js";
import { iniciaPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "./middlewares/winstonLogger.mid.js";
import winstonLogger from "./utils/winston.util.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import opts from "../src/utils/swagger.util.js";

connectMongoDB();
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static("./src/public"));
iniciaPassport();
app.use(passport.initialize());
app.use(winston);
const specs = swaggerJsdoc(opts);
app.use("/api/docs", serve, setup(specs));
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send("OK");
});
const httpServer = app.listen(config.PORT, () => {
  winstonLogger.info(`Servidor escuchando en el Puerto ${config.PORT}`);
});

export default app;
