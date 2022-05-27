import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserArgs } from './dto/args';
import { UserInput } from './dto/input';
import { User } from './models/user.model';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query((returns) => [User])
  users(@Args() userArgs: UserArgs): Promise<User[]> {
    return this.userService.findAll(userArgs);
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUser: UserInput): Promise<User> {
    const user = await this.userService.create(newUser);
    pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.userService
      .remove(id)
      .then(() => true)
      .catch(() => false);
  }

  @Subscription((returns) => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
