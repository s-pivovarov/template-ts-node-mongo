import { APIRoutesCB } from "@api/types";

import { ConfdataController } from "@api/db/controllers";

class ConfigAPI {
  get: APIRoutesCB = async (req, res) => {
    const config = new ConfdataController();

    let value;

    try {
      value = await config.get(req.params.id);
    } catch (err) {
      value = { error: "Oups..." };

      logger.error(err);
    }

    res.send(JSON.stringify(value));
  };

  post: APIRoutesCB = async (_, res) => {
    const testConfig = {
      name: `test`,
      content: {
        tm: Date.now(),
        u: "s.pivovarov",
      },
    };

    try {
      const config = new ConfdataController();

      await config.save(testConfig.name, testConfig.content);
    } catch (err) {
      logger.error(err);
    }

    res.send("config saved");
  };

  put: APIRoutesCB = async (req, res) => {
    const config = new ConfdataController();

    let value;

    try {
      value = await config.update(req.params.id, {
        name: "Sergey Pivovarov",
        content: {
          data: "I Update: s.pivovarov",
        },
      });
    } catch (err) {
      value = { error: "Oups..." };

      logger.error(err);
    }

    res.send(JSON.stringify(value));
  };

  delete: APIRoutesCB = async (req, res) => {
    const config = new ConfdataController();

    let value: Distinct<any> = { message: "Success" };

    try {
      await config.delete(req.params.id);
    } catch (err) {
      value = { error: "Oups..." };

      logger.error(err);
    }

    res.send(JSON.stringify(value));
  };
}

export const configAPI = new ConfigAPI();
