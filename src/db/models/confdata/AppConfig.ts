import mongoose from "mongoose";

import { DBNames } from "@api/db/constants";
import { connections } from "@api/db/connections";

const AppConfigSchema = new mongoose.Schema({
  name: String,
  config: JSON,
});

// Поскольку соединений несколько, то нужно обарачивать в функции.
// Иначе, `connections` не успевают заполниться
export const getAppConfigModel = () => {
  const confdataDB = connections.get(DBNames.confdata);

  return confdataDB.model("AppConfig", AppConfigSchema);
};
