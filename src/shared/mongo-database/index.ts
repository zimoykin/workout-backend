import { Logger } from '@nestjs/common';
import { EventEmitter } from 'events';
import { MongoClient } from 'mongodb';
import { User } from '../../domain/user/models/user.model';

const getClient = () => {
  const dbUrl = process.env.DATABASE_URL as string;
  const client = new MongoClient(dbUrl);
  return client;
};

export class Mongo extends EventEmitter {
  private static _instance: Mongo;
  private client: MongoClient;

  get database(): MongoClient {
    return this.client;
  }

  static getInstance(): Mongo {
    if (this._instance) return this._instance;
    else {
      const mongo = new Mongo();
      Mongo._instance = mongo;
      getClient()
        .connect()
        .then((client) => {
          mongo.client = client;
          mongo.emit('connected');
          mongo.createCollections();
        });

      return mongo;
    }
  }

  private createCollections() {
    const db = this.client.db();
    db.collections((err, list) => {
      if (err) Logger.error(err);
      else {
        [User].forEach((type) => {
          if (
            list.find((vl) => vl.collectionName === type.name.toLowerCase()) ===
            undefined
          ) {
            db.createCollection(type.name.toLowerCase()).then(() =>
              Logger.debug('collection created', type.name.toLowerCase()),
            );
          }
        });
      }
    });
  }

  private constructor() {
    super();
  }
}
