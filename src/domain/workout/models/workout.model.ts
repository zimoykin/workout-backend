import { Field, ObjectType } from '@nestjs/graphql';
import { IWorkoutType } from '../../../shared/types';
import { Model } from '../../../shared/database/model';
import { User } from '../../user/models/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'workout' })
@Entity('workout')
export class Workout extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field({ nullable: false })
  @Column()
  workoutType: IWorkoutType;

  @Field({ nullable: false })
  @Column()
  start: Date;

  @Field({ nullable: false })
  @Column()
  end: Date;

  @Field({ nullable: false })
  @Column()
  bpm: number;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @ManyToOne(() => User, (_) => _.id)
  user: User;

  static get mock(): Workout {
    const mock = new Workout();
    mock.workoutType = IWorkoutType.hiit;
    mock.bpm = 125;
    mock.start = new Date();
    mock.end = new Date();
    mock.user = User.mock;

    return mock;
  }
}
