import { getAppConfigModel } from "../models";

type ConfigData = Distinct<any>;

interface Confdata {
  save(name: string, content: ConfigData): Promise<void>;
  get(id: Id): ConfigData;
  update(id: Id, value: { name: string; content: ConfigData }): Promise<void>;
  delete(id: Id): Promise<void>;
}

export class ConfdataController implements Confdata {
  private model;

  constructor() {
    this.model = getAppConfigModel();
  }

  public async save(name: string, content: ConfigData) {
    const newConfig = new this.model({ name, content });

    await newConfig.save();
  }

  public async get(id: Id) {
    return await this.model.find({ _id: id.toString() });
  }

  public async update(id: Id, value: { name: string; content: ConfigData }) {
    await this.model.findByIdAndUpdate(id, value);
  }

  public async delete(id: Id) {
    await this.model.findByIdAndDelete(id);
  }
}
