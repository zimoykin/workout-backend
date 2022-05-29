import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { UserRole } from '../../../shared/dto/userRole.dto';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  @MaxLength(30)
  firstName: string;

  @Field({ nullable: false })
  @MaxLength(30)
  lastName: string;

  @Field({ nullable: false })
  @IsEnum(UserRole)
  role: UserRole;

  @Field({ nullable: false })
  @IsEmail()
  email: string;
}
