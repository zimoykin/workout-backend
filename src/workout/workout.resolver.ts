import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/models/user.model';
import { CurrentUser } from '../shared/currentUser';
import { AuthGuard } from '../shared/security/jwt.guard';
import { WOArgs } from './dto/args';
import { WorkoutInput } from './dto/input';
import { Workout as Model } from './models/workout.model';
import { WorkoutService } from './workout.service';

@Resolver((of) => Model)
export class WorkoutResolver {
  constructor(private readonly woService: WorkoutService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => Model)
  async workout(@Args('id') id: string): Promise<Model> {
    const user = await this.woService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => [Model])
  workouts(@Args() woArgs: WOArgs): Promise<Model[]> {
    return this.woService.findAll(woArgs);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Model)
  async addWorkout(
    @CurrentUser() auth: User,
    @Args('input') input: WorkoutInput,
  ): Promise<Model> {
    const user = await this.woService.create(input);
    return user;
  }
  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async removeWorkout(@Args('id') id: string) {
    return this.woService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }
}
