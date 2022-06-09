export abstract class Model {
  static fromData<T extends Model>(type: new () => T, raw: any): T {
    const model = new type();
    Object.assign(model, raw);
    return model;
  }
}
