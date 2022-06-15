import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Confirm {
  @Field({ nullable: false })
  status?: string;
}
