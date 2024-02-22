import { ILogger } from "./utils/logger";

declare global {
  var logger: ILogger;
}

declare module globalThis {
  var logger: ILogger;
}
