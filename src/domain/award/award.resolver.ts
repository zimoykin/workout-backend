import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { IAuthorizedUser } from '../../shared/dto/auth.interface';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { Award } from './models/award.model';
import { AwardService } from './award.service';
import { AwardArgs } from './dto/query.dto';
import DataLoader from 'dataloader';
import { User } from '../user/models/user.model';

@Resolver(() => Award)
export class AwardResolver {
  constructor(
    private readonly service: AwardService
    ) {}

  @UseGuards(AuthGuard)
  @Query(() => [Award])
  awards(
    @AuthUser() auth: IAuthorizedUser,
    @Args('args') args: AwardArgs,
  ): Promise<Award[]> {
    return this.service.findAll({ userId: auth.id, ...args });
  }

  @ResolveField('user', () => User)
  getUser(
    @Parent() award: Award,
    @Context('usersLoader') usersLoader: DataLoader<string, User>,
  ) {
    const { userId } = award;
    return usersLoader.load(userId);
  }
}
