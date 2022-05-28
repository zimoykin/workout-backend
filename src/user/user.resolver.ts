import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../shared/security/jwt.guard';
import { AdminGuard } from '../shared/security/role.guard';
import { QueryArgs } from './dto/args';
import { UserInput } from './dto/input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(AdminGuard)
  @Query((returns) => [User])
  users(
    @Args() args: QueryArgs,
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
  ): Promise<User[]> {
    return this.userService.findAll({ firstName, lastName }, args);
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUser: UserInput): Promise<User> {
    const user = await this.userService.create(newUser);
    return user;
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.userService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }
}
