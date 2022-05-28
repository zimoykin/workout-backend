import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Model } from '../../shared/database/model';

@ObjectType({ description: 'auth' })
export class Auth extends Model {
  @Field()
  _id: string;

  @Field({ nullable: false })
  hash: string;

  @Field({ nullable: false })
  salt: string;

  @Field()
  userId: string;

  static get mock(): Auth {
    const user = new Auth();
    user.hash = '12312312312312312312';
    user.salt = '12312312312312312312';
    user.userId = User.mock._id;

    return user;
  }
}
