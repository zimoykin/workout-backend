import { InternalServerErrorException } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { Mongo } from '.';
import { Model } from './model';

export class Repository<T extends Model> {
  type: new () => T;

  constructor(type: new () => T) {
    this.type = type;
  }

  private get collection(): Collection {
    const client = Mongo.getInstance();
    return client.database.db().collection(this.type.name.toLowerCase());
  }

  async find(id: string): Promise<T> {
    const result = await this.collection.findOne({ _id: new ObjectId(id) });
    const model = Model.fromData(this.type, result);
    return model;
  }

  async findAll(_query?: Partial<T>): Promise<T[]> {
    const result = await this.collection.find().toArray();
    const models = result.map((val) => {
      return Model.fromData(this.type, val);
    });
    return models;
  }

  async create(input: T): Promise<T> {
    const result = await this.collection.insertOne(input);
    if (result.acknowledged) {
      const model = await this.find(result.insertedId.toString());
      return model;
    } else throw InternalServerErrorException;
  }

  update(id: string, update: Partial<T>): Promise<T> {
    return {} as any;
  }
  async remove(id: string) {
    const result = await this.collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (result.ok) {
      return { status: 'deleted' };
    } else throw InternalServerErrorException;
  }
}
