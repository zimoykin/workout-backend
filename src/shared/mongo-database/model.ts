export abstract class Model {
  static fromData<T extends Model>(type: new () => T, raw: any): T {
    const model = new type();
    Object.assign(model, raw);
    return model;
  }

  getValue<T extends Model>(type: new () => T, key: keyof T): any {
    const model = new type();
    Object.assign(model, this);
    return model[key];
  }
}
