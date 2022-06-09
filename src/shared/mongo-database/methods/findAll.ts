import { Model } from '../model';

export async function findAll<T extends Model>(
  query?: Partial<T>,
): Promise<T[]> {
  const result = await this.collection.find(query).toArray();
  const models = result.map((val) => {
    return Model.fromData(this.type, val);
  });
  return models;
}
