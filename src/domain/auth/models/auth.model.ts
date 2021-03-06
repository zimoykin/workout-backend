import { Field, ObjectType } from '@nestjs/graphql';
import { generateHash, generateSalt } from '../../../shared/security';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../domain/user/models/user.model';
import { Model } from '../../../shared/mongo-database/model';

const length = 512;
const iterations = 32;

@ObjectType({ description: 'auth' })
@Entity('auth')
export class Auth extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: length * 2 })
  private hash: string;

  @Column({ type: 'varchar', length: length * 2 })
  private salt: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @OneToOne(() => User, (_) => _.id, { nullable: false })
  @JoinColumn()
  user: User;

  //methods
  checkPassword = (password: string): boolean =>
    this.hash === generateHash(password, this.salt, iterations, length);

  set hashPassword(password: string) {
    this.salt = generateSalt(length);
    this.setHash(password);
  }

  private setHash(base64Password: string) {
    this.hash = generateHash(base64Password, this.salt, iterations, length);
  }
}
