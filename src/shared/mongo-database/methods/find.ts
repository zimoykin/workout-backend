import { ObjectId } from 'mongodb';
import { Model } from '../model';

export async function find<T extends Model>(id: string): Promise<T> {
  const result = await this.collection.findOne({ id: new ObjectId(id) });
  const model = Model.fromData(this.type, result);
  return model as T;
}
