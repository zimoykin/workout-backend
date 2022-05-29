import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'src/shared/database/repository';
import { QueryArgs } from './dto/args';
import { UserInput } from './dto/input.dto';
import { UserUpdate } from './dto/update.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  repo: Repository<User>;
  constructor() {
    this.repo = new Repository(User);
  }

  async update(id: string, data: UserUpdate): Promise<User> {
    const created = await this.repo.update(id, data);
    if (created) return created;
    else throw new InternalServerErrorException();
  }

  async create(input: UserInput): Promise<User> {
    const created = await this.repo.create(User.fromInput(input));
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
