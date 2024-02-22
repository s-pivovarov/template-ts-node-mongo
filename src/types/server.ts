import { Request, Response } from "express";

export type APIRoutesTypes = "GET" | "POST" | "PUT" | "PUTCH" | "DELETE";

export type APIRoutesCB = (req: Request, res: Response) => void;

export type APIRoutesMap = {
  [key: `${APIRoutesTypes} ${string}`]: APIRoutesCB;
};
