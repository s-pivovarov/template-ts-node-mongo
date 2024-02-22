import express from "express";

import { routes } from "@api/routes";
import { APIRoutesMap } from "@api/types";

import { SERVER_PORT } from "@api/constants";

const app = express();

class Server {
  public listen = (port: number, cb: () => void) => {
    return app.listen(port, cb);
  };

  public apiMapCreate = (routes: APIRoutesMap) => {
    for (let route in routes) {
      const [method, uri] = route.split(" ");

      try {
        const methodKey =
          method.toLocaleLowerCase() as keyof express.Application;

        app[methodKey](uri, (routes as any)[route] as any);
      } catch (err) {
        logger.error(err);
      }
    }
  };

  public create() {
    const server = new Server();

    server.listen(SERVER_PORT, () => {
      logger.log(`\nNodeJS Server: started on port ${SERVER_PORT}\n`);
    });

    server.apiMapCreate(routes);
  }
}

export const server = new Server();
