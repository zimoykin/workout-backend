import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../domain/user/models/user.model';
import { Model } from '../../../shared/database/model';

@ObjectType({ description: 'auth' })
@Entity('auth')
export class Auth extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column()
  hash: string;

  @Field({ nullable: false })
  @Column()
  salt: string;

  @Field()
  @OneToOne(() => User, _ => _.id)
  user: User;

  static get mock(): Auth {
    const auth = new Auth();
    auth.id = '1234-1234-1234-111234';
    auth.hash = '12312312312312312312';
    auth.salt = '12312312312312312312';
    auth.user = User.mock;

    return auth;
  }
}
