import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../shared/dto/userRole.dto';

@InputType()
export class RegisterInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @MinLength(5)
  @MaxLength(64)
  password: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  @IsEnum(UserRole)
  role: UserRole;

  @Field({ nullable: false })
  @Min(0)
  @Max(300)
  weight: number;

  @Field({ nullable: false })
  @Min(0)
  @Max(150)
  age: number;
}
