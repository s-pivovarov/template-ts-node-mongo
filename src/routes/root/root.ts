import { APIRoutesCB } from "@api/types";

export const root: APIRoutesCB = (_, res) => {
  res.send("Hello!");
};
