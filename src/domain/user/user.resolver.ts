import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { AdminGuard } from '../../shared/security/admin.guard';
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
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
  ): Promise<User[]> {
    const filter = {} as Partial<User>;
    if (firstName) filter.firstName = firstName;
    if (lastName) filter.lastName = lastName;
    return this.userService.findAll(filter);
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => User)
  async updateUser(
    @Args('id', { nullable: false }) id: string,
    @Args('userUpdate', { nullable: false }) update: UserUpdate,
  ): Promise<User> {
    const user = await this.userService.update(id, update);
    return user;
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Boolean)
  async removeUser(@AuthUser() user: User, @Args('id') id: string) {
    console.log(user);
    return this.userService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }
}
