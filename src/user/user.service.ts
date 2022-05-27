import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Mongo } from 'src/shared/database';
import { Repository } from 'src/shared/database/repository';
import { UserArgs } from './dto/args';
import { UserInput } from './dto/input';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  repo: Repository<User>;
  constructor() {
    this.repo = new Repository(User);
  }

  async create(data: UserInput): Promise<User> {
    const user = new User();
    Object.assign(user, data);
    const created = await this.repo.create(user);
    if (created) return created;
    else throw InternalServerErrorException;
  }

  async findOneById(id: string): Promise<User> {
    return this.repo.find(id);
  }

  async findAll(recipesArgs: UserArgs): Promise<User[]> {
    return [] as User[];
  }

  async remove(id: string): Promise<{ status: string }> {
    return this.repo.remove(id);
  }
}
