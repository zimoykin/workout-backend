import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout as Model, Workout } from './models/workout.model';
import { WorkoutService } from './workout.service';
import { IAuthorizedUser } from '../../shared/dto/auth.interface';
import { User } from '../user/models/user.model';
import DataLoader from 'dataloader';

@Resolver(() => Model)
export class WorkoutResolver {
  constructor(private readonly woService: WorkoutService) {}

  @UseGuards(AuthGuard)
  @Query(() => Model)
  async workout(@Args('id') id: string): Promise<Model> {
    const user = await this.woService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => [Model])
  workouts(
    @AuthUser() auth: IAuthorizedUser,
    @Args() woArgs: WOQuery,
  ): Promise<Model[]> {
    return this.woService.findAll(woArgs, auth.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Model)
  async addWorkout(
    @AuthUser() auth: IAuthorizedUser,
    @Args('input') input: WorkoutInput,
  ): Promise<Model> {
    console.log(auth);
    const user = await this.woService.create(input, auth.id);
    return user;
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeWorkout(@Args('id') id: string) {
    return this.woService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }

  @ResolveField('user', () => User)
  getUser(
    @Parent() workout: Workout,
    @Context('usersLoader') usersLoader: DataLoader<string, User>,
  ) {
    const { userId } = workout;
    return usersLoader.load(userId);
  }
}
