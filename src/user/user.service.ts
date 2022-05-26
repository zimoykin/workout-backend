import { Injectable } from '@nestjs/common';
import { UserArgs } from './dto/args';
import { UserInput } from './dto/input';
import { User } from './models/user.model';


@Injectable()
export class UserService {

  async create(data: UserInput): Promise<User> {
    return {} as any;
  }

  async findOneById(id: string): Promise<User> {
    return {} as any;
  }

  async findAll(recipesArgs: UserArgs): Promise<User[]> {
    return [] as User[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}