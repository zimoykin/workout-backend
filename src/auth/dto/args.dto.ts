import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Field({ nullable: false })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @MinLength(5)
  @MaxLength(64)
  @ApiProperty()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field({ nullable: false })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Field({ nullable: false })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @MinLength(5)
  @MaxLength(64)
  @ApiProperty()
  password: string;

  @Field({ nullable: false })
  @ApiProperty()
  firstName: string;

  @Field({ nullable: false })
  @ApiProperty()
  lastName: string;
}
