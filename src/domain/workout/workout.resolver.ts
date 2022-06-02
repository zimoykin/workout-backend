import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout as Model } from './models/workout.model';
import { WorkoutService } from './workout.service';
import { IAuthorizedUser } from '../../shared/dto/auth.interface';

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
  workouts(@Args() woArgs: WOQuery): Promise<Model[]> {
    return this.woService.findAll(woArgs);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Model)
  async addWorkout(
    @AuthUser() auth: IAuthorizedUser,
    @Args('input') input: WorkoutInput,
  ): Promise<Model> {
    const user = await this.woService.create({ userId: auth.id, ...input });
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
