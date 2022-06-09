import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { IWorkoutType } from '../../../shared/types';
import { Model } from '../../../shared/mongo-database/model';
import { User } from '../../user/models/user.model';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { calculate } from 'src/shared/calculate';

@ObjectType({ description: 'workout' })
@Entity('workout')
export class Workout extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column()
  workoutType: IWorkoutType;

  @Field({ nullable: false })
  @Column()
  start: string;

  @Field({ nullable: false })
  @Column()
  end: string;

  @Field({ nullable: false })
  @Column()
  bpm: number;

  @Field({ nullable: true })
  @Column()
  calories: number;

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
  @RelationId((wo: Workout) => wo.user)
  userId: string;

  @BeforeInsert()
  calculateCalories() {
    this.calories = calculate(
      this.workoutType,
      this.user.weight,
      this.end,
      this.start,
    );
  }
}
