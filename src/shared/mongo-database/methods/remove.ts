import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export async function remove(id: string) {
  const result = await this.collection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (result.ok) {
    Logger.debug('object deleted', id, this.type);
    return { status: 'deleted' };
  } else throw new InternalServerErrorException();
}
