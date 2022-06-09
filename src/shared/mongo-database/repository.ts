import { Collection } from 'mongodb';
import { Mongo } from '.';
import { create } from './methods/create';
import { find as findM } from './methods/find';
import { findAll } from './methods/findAll';
import { remove } from './methods/remove';
import { update } from './methods/update';
import { Model } from './model';

type ModelClass<T extends Model> = new () => T;

export class Repository<T extends Model> {
  type: ModelClass<T>;

  constructor(type: ModelClass<T>) {
    this.type = type;
  }

  get collection(): Collection {
    const client = Mongo.getInstance();
    return client.database.db().collection(this.type.name.toLowerCase());
  }

  find = async (id: string): Promise<T> => findM.bind(this)(id);

  findAll = async (query?: Partial<T>): Promise<T[]> =>
    findAll.bind(this)(query);

  create = async (input: T): Promise<T> => create.bind(this)(input);

  update = async (id: string, upd: Partial<T>): Promise<T> =>
    update.bind(this)(id, upd);

  remove = async (id: string): Promise<{ status: string }> =>
    remove.bind(this)(id);
}
