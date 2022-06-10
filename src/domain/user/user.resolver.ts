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
import { IAuthorizedUser } from '../../shared/dto/auth.interface';
import { AuthGuard } from '../../shared/security/jwt.guard';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { AdminGuard } from '../../shared/security/admin.guard';
import { UserUpdate } from './dto/update.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { Award } from '../award/models/award.model';
import DataLoader from 'dataloader';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(AdminGuard)
  @Query(() => [User])
  users(
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
  ): Promise<User[]> {
    const filter = {} as Partial<User>;
    if (firstName) filter.firstName = firstName;
    if (lastName) filter.lastName = lastName;
    return this.userService.findAll(filter);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async addFriend(
    @AuthUser() auth: IAuthorizedUser,
    @Args('userId', { nullable: false }) userId: string,
  ): Promise<User> {
    return this.userService.addFriend(auth.id, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async removeFriend(
    @AuthUser() auth: IAuthorizedUser,
    @Args('userId', { nullable: false }) userId: string,
  ): Promise<User> {
    return this.userService.removeFriend(auth.id, userId);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id', { nullable: false }) id: string,
    @Args('userUpdate', { nullable: false }) update: UserUpdate,
  ): Promise<User> {
    const user = await this.userService.update(id, update);
    return user;
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean)
  async removeUser(@AuthUser() user: User, @Args('id') id: string) {
    console.log(user);
    return this.userService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }

  //

  @ResolveField('awards', () => [Award])
  getUser(
    @Parent() user: User,
    @Context('awardsLoader') awardsLoader: DataLoader<string, Award[]>,
  ) {
    const { id } = user;
    return awardsLoader.load(id);
  }
}
