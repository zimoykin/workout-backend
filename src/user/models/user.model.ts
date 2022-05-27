import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Model } from '../../shared/database/model';

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

  @Field()
  createdAt: Date;

  static get mock(): User {
    const user = new User();
    user.email = 'test@test.test';
    user.firstName = 'John';
    user.lastName = 'Doe';

    return user;
  }
}
