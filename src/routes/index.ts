import { root } from "./root";
import { configAPI } from "./config";

export const routes = {
  "GET /": root,
  "POST /config": configAPI.post,
  "GET /config/:id": configAPI.get,
  "PUT /config/:id": configAPI.put,
  "DELETE /config/:id": configAPI.delete,
};
