import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Interval {
  @Field({ nullable: false })
  from: string;

  @Field({ nullable: false })
  to: string;
}

@InputType()
export class AwardArgs {
  @Field({ nullable: true })
  interval?: Interval;

  @Field({ nullable: true })
  awardType?: string;
}

