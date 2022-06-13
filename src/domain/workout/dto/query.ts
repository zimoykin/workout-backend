import { Field, InputType } from '@nestjs/graphql';
import { IPage } from '../../../shared/dto/pagination.dto';

@InputType()
export class WOQuery {
  @Field({ nullable: true })
  bpm?: number;

  @Field({ nullable: true })
  minCalories?: number;

  @Field({ nullable: true })
  page?: IPage;
}
