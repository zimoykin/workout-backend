import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, MaxLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  @MaxLength(30)
  firstName: string;

  @Field({ nullable: false })
  @MaxLength(30)
  lastName: string;

  @Field({ nullable: false })
  @Length(6, 255)
  @IsEmail()
  email: string;
}
