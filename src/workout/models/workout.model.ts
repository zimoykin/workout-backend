import { Field, ObjectType } from '@nestjs/graphql';
import { IWorkoutType } from '../../shared/types';
import { Model } from '../../shared/database/model';
import { User } from '../../user/models/user.model';

@ObjectType({ description: 'workout' })
export class Workout extends Model {
  @Field()
  _id: string;

  @Field({ nullable: false })
  workoutType: IWorkoutType;

  @Field({ nullable: false })
  start: Date;

  @Field({ nullable: false })
  end: Date;

  @Field({ nullable: false })
  bpm: number;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;

  static get mock(): Workout {
    const mock = new Workout();
    mock.workoutType = IWorkoutType.hiit;
    mock.bpm = 125;
    mock.start = new Date();
    mock.end = new Date();
    mock.userId = User.mock._id;

    return mock;
  }
}
