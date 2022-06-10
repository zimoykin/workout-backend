import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Workout } from '../../../domain/workout/models/workout.model';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Model } from '../../../shared/mongo-database/model';
import { UserRole } from '../../../shared/dto/userRole.dto';
import { UserInput } from '../dto/input.dto';
import { Award } from 'src/domain/award/models/award.model';

@ObjectType({ description: 'user' })
@Entity('user')
export class User extends Model {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column()
  firstName: string;

  @Field({ nullable: false })
  @Column()
  lastName: string;

  @Field({ nullable: false })
  @Column()
  email: string;

  @Field({ nullable: false })
  @Column()
  role: UserRole;

  @Field({ nullable: false })
  @Column()
  weight: number;

  @Field({ nullable: false })
  @Column()
  age: number; //years

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @HideField()
  @ManyToMany(() => User)
  @JoinTable({ name: 'friends' })
  friends: User[];

  @HideField()
  @OneToMany(() => Workout, (_) => _.user)
  workouts: Workout[];

  @Field(() => [Award])
  @OneToMany(() => Award, (_) => _.user)
  awards: Award[];

  static fromInput(input: UserInput): User {
    const user = new User();
    Object.assign(user, input);
    return user;
  }
}
