import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class WorkoutInput {
  @Field({ nullable: false })
  @MaxLength(30)
  workoutType: string;

  @Field({ nullable: false })
  @IsDateString()
  start: string;

  @Field({ nullable: false })
  @IsDateString()
  end: string;

  @Field({ nullable: false })
  @IsNumber()
  bpm: number;
}
