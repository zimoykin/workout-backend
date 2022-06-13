import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class IPage {
  @Field({ nullable: false })
  page: number;

  @Field({ nullable: false })
  limit: number;
}