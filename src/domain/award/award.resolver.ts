import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { IAuthorizedUser } from 'src/shared/dto/auth.interface';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { Award } from './models/award.model';
import { AwardService } from './award.service';
import { AwardArgs } from './dto/query.dto';

@Resolver()
export class AwardResolver {
  constructor(private readonly service: AwardService) {}

  @UseGuards(AuthGuard)
  @Query((of) => [Award])
  awards(
    @AuthUser() auth: IAuthorizedUser,
    @Args('args') args: AwardArgs,
  ): Promise<Award[]> {
    return this.service.findAll({ userId: auth.id, ...args });
  }
}
