import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/shared/dto/userRole.dto';
import { Model } from '../../shared/database/model';
import { UserInput } from '../dto/input';

@ObjectType({ description: 'user' })
export class User extends Model {
  @Field()
  _id: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  role: UserRole;

  @Field()
  createdAt: Date;

  static fromInput(input: UserInput): User {
    const user = new User();
    Object.assign(user, input);
    return user;
  }

  static get mock(): User {
    const user = new User();
    user.email = 'test@test.test';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.role = 'user';

    return user;
  }
}
