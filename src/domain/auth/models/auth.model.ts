import { Field, ObjectType } from '@nestjs/graphql';
import { generateHash, generateSalt } from '../../../shared/security';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../domain/user/models/user.model';
import { Model } from '../../../shared/database/model';

const length = 512;
const iterations = 32;

@ObjectType({ description: 'auth' })
@Entity('auth')
export class Auth extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: length * 2 })
  private hash: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: length * 2 })
  private salt: string;

  @Field()
  @OneToOne(() => User, (_) => _.id)
  @JoinColumn()
  user: User;

  //methods
  checkPassword = (base64password: string): boolean =>
    this.hash === generateHash(base64password, this.salt, iterations, length);

  set hashPassword(base64: string) {
    this.salt = generateSalt(length);
    this.setHash(base64);
  }

  private setHash(base64Password: string) {
    this.hash = generateHash(base64Password, this.salt, iterations, length);
  }

  static get mock(): Auth {
    const auth = new Auth();
    auth.id = '1234-1234-1234-111234';
    auth.setHash('@Admin123');
    auth.user = User.mock;
    return auth;
  }
}
