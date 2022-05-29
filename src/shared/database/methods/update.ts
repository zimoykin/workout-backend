import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export async function update<T>(id: string, update: Partial<T>): Promise<T> {
  const upd = await this.collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
  );
  if (upd.ok) {
    return this.find(id);
  } else throw new BadRequestException();
}
