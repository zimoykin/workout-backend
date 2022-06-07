import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserInput } from './dto/input.dto';
import { UserUpdate } from './dto/update.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async update(id: string, data: UserUpdate): Promise<User> {
    const updated = await this.repo.update(id, data);
    if (updated) return this.findOneById(id);
    else throw new InternalServerErrorException();
  }

  async create(input: UserInput): Promise<User> {
    const created = this.repo.save(User.fromInput(input));
    if (created) return created;
    else throw new InternalServerErrorException();
  }

  async findOneById(id: string): Promise<User> {
    return this.repo.findOneBy({ id: id });
  }
  async findByIds(...ids: string[]): Promise<User[]> {
    return this.repo.find({ where: { id: In(ids) } });
  }

  async findAll(query?: Partial<User>): Promise<User[]> {
    return this.repo.find({ where: { ...query } });
  }

  async remove(id: string): Promise<{ status: string }> {
    await this.repo.delete(id);
    return { status: 'deleted' };
  }
}
