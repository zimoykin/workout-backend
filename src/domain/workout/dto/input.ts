import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { IWorkoutType } from '../../../shared/types';

@InputType()
export class WorkoutInput {
  @Field({ nullable: false })
  @IsEnum(IWorkoutType)
  workoutType: string;

  @Field({ nullable: false })
  @IsNumber()
  @Min(5)
  duration: number;

  @Field({ nullable: false })
  @IsNumber()
  bpm: number; //average
}
