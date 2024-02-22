import * as dotenv from "dotenv";
dotenv.config();

export const Env = {
  PORT: process.env.PORT,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
};
