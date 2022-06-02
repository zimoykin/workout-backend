import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Model } from '../../../shared/database/model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field({ nullable: false })
  @ManyToOne(() => User, (_) => _.id)
  user: User;

  static get mock(): Award {
    const model = new Award();
    model.id = '12341-23412-34123-1324';
    model.score = 100;
    model.awardType = 'golden';
    model.user = User.mock;
    return;
  }
}
