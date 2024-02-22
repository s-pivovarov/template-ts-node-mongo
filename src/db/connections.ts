import { DBClient } from "./client";
import { DBNames } from "./constants";

class Connections {
  private list: { [key in DBNames]?: DBClient } = {};

  /** Нельзя использовать в потоке */
  get(dbName: DBNames) {
    if (!this.list || !this.list[dbName] || !this.list[dbName]?.db) {
      logger.error("Error: Connections list not inited!");
      throw new Error();
    }

    return this.list[dbName]!.db!;
  }

  async init() {
    const connections = [];

    let key: keyof typeof DBNames;
    for (key in DBNames) {
      connections.push(new DBClient(DBNames[key]).connect());
    }

    const dbLinks = await Promise.all(connections);

    dbLinks.forEach((db) => {
      this.list[db.dbName] = db;
    });
  }
}

export const connections = new Connections();
