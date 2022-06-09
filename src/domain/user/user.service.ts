import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async addFriend(userId: string, friendId: string): Promise<User> {
    const qb = this.repo.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.friends', 'friends');
    qb.where('model.id = :id', { id: userId });
    const user = await qb.getOne();
    const friend = await this.findOneById(friendId);

    if (user && friend) {
      user.friends.push(friend);
    } else throw new BadRequestException();
    return this.repo.save(user);
  }

  async removeFriend(userId: string, friendId: string): Promise<User> {
    const qb = this.repo.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.friends', 'friends');
    qb.where('model.id = :id', { id: userId });
    const user = await qb.getOne();
    if (user) {
      user.friends = user.friends.filter((fr) => fr.id !== friendId);
      this.repo.save(user);
    } else throw new BadRequestException();
    return this.repo.save(user);
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

  async findAll(query?: any): Promise<User[]> { //TODO
    return this.repo.find({ where: { ...query } });
  }

  async remove(id: string): Promise<{ status: string }> {
    await this.repo.delete(id);
    return { status: 'deleted' };
  }
}
