import { Env } from "@api/constants";

export const { MONGO_PORT, MONGO_HOST } = Env;
export const MONGO_SERVER_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/`;

export enum DBNames {
  confdata = "confdata",
}
