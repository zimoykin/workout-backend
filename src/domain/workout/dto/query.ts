import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class WOQuery {
  @Field({ nullable: true })
  bpm?: number;
}
