import mongoose from "mongoose";
import config from "./env.config.js";
import winstonLogger from "../utils/winston.util.js";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DB_NAME,
    });
    winstonLogger.info("DB conectada...!!!");
  } catch (error) {
    winstonLogger.error(`Error al conectar a DB: ${error}`);
  }
};
connectMongoDB();
