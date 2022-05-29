import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/domain/user/models/user.model';
import { Model } from '../../../shared/database/model';

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
    const auth = new Auth();
    auth._id = '62931de7588054c76b628d2b';
    auth.hash = '12312312312312312312';
    auth.salt = '12312312312312312312';
    auth.userId = User.mock._id;

    return auth;
  }
}
