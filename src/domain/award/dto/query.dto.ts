import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AwardArgs {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  score?: number;

  @Field({ nullable: true })
  awardType?: string;
}
