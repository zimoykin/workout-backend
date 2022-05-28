import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IStatusResponse {
  @Field()
  status: string;
}
