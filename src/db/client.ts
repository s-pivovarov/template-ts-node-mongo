import MongooseClient from "mongoose";

import { Env } from "@api/constants/environment";

import { DBNames, MONGO_SERVER_URI } from "./constants";

export class DBClient {
  dbName: DBNames;
  db: MongooseClient.Connection | undefined;

  constructor(dbName: DBNames) {
    this.db = undefined;
    this.dbName = dbName;
  }

  private log(...args: any[]) {
    logger.log(`> MongoDB[${this.dbName}]:`, ...args);
  }

  private error(...args: any[]) {
    logger.error(`> MongoDB[${this.dbName}]:`, ...args);
  }

  connect = async () => {
    try {
      this.log("connection", MONGO_SERVER_URI);

      const connection = await MongooseClient.createConnection(
        MONGO_SERVER_URI,
        {
          dbName: this.dbName,
          user: Env.MONGO_INITDB_ROOT_USERNAME,
          pass: Env.MONGO_INITDB_ROOT_PASSWORD,
        }
      ).asPromise();

      this.log("Success");

      this.db = connection;
    } catch (err) {
      this.error(err);
      throw err;
    }

    return this;
  };
}
