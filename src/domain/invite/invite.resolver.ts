import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { IAuthorizedUser } from '../../shared/dto/auth.interface';
import { InviteService } from './invite.service';
import { Invite } from './models/invite.model';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { Confirm } from './dto/confirm.dto';

@Resolver(() => Invite)
export class InviteResolver {
 constructor(private readonly service: InviteService) {}


  @Mutation(() => Invite)
  @UseGuards(AuthGuard)
  invite(
    @AuthUser() auth: IAuthorizedUser,
    @Args('id', { nullable: false }) userId: string,
  ): Promise<Invite> {
    return this.service.create(auth.id, userId);
  }

  @Mutation(() => Confirm)
  @UseGuards(AuthGuard)
  confirm(
    @AuthUser() auth: IAuthorizedUser,
    @Args('id', { nullable: false }) inviteId: string,
  ): Promise<Confirm> {
    return this.service.confirm(auth.id, inviteId);
  }
}
