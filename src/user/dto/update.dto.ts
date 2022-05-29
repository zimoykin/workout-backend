import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, isValidationOptions, Length, MaxLength } from 'class-validator';
import { UserRole } from '../../shared/dto/userRole.dto';

@InputType()
export class UserUpdate {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @IsEnum(UserRole)
  role?: UserRole;
}
