import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../domain/user/models/user.model';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => User, (_) => _.invites)
  @JoinColumn()
  @Field(() => User)
  to: User;

  @ManyToOne(() => User, (_) => _.request)
  @JoinColumn()
  @Field(() => User)
  from: User;
}
