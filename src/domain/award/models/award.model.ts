import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Model } from '../../../shared/mongo-database/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('award')
export class Award extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column()
  score: number;

  @Field({ nullable: false })
  @Column()
  awardType: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (_) => _.id)
  user: User;

  @HideField()
  @RelationId((aw: Award) => aw.user)
  userId: string;

}
