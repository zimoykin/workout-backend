import { InternalServerErrorException } from '@nestjs/common';

export async function create<T>(input: T): Promise<T> {
  const result = await this.collection.insertOne(input);
  if (result.acknowledged) {
    const model = await this.find(result.insertedId.toString());
    return model;
  } else throw new InternalServerErrorException();
}
