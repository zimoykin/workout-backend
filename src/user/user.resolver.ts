import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../shared/security/jwt.guard';
import { AdminGuard } from '../shared/security/role.guard';
import { QueryArgs } from './dto/args';
import { UserUpdate } from './dto/update.dto';
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
    const filter = {} as Partial<User>;
    if (firstName) filter.firstName = firstName;
    if (lastName) filter.lastName = lastName;
    return this.userService.findAll(filter, args);
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => User)
  async updateUser(
    @Args('id', { nullable: false }) id: string,
    @Args('userUpdate') update: UserUpdate,
  ): Promise<User> {
    const user = await this.userService.update(id, update);
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
