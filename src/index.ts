import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@api": __dirname,
});

moduleAlias();

import { logger } from "@api/utils/logger";

logger.log();

global.logger = logger;

import { server } from "./server";
import { connections } from "@api/db/connections";

(async () => {
  try {
    await connections.init();
    await server.create();
  } catch {
    logger.log("\nunidentified error\n");
  }
})();
