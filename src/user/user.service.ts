import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'src/shared/database/repository';
import { QueryArgs } from './dto/args';
import { UserInput } from './dto/input';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  repo: Repository<User>;
  constructor() {
    this.repo = new Repository(User);
  }

  async create(data: UserInput): Promise<User> {
    const created = await this.repo.create(User.fromInput(data));
    if (created) return created;
    else throw new InternalServerErrorException();
  }

  async findOneById(id: string): Promise<User> {
    return this.repo.find(id);
  }

  async findAll(
    query?: Partial<User>,
    recipesArgs?: QueryArgs,
  ): Promise<User[]> {
    return this.repo.findAll(query);
  }

  async remove(id: string): Promise<{ status: string }> {
    return this.repo.remove(id);
  }
}
