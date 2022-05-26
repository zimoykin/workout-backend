import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, MaxLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  LastName: string;

  @Field({ nullable: false })
  @Length(6, 255)
  @IsEmail()
  email?: string;
}