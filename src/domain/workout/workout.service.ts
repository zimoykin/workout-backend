import { Injectable, NotFoundException } from '@nestjs/common';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout } from './models/workout.model';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/models/user.model';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private readonly repo: Repository<Workout>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findOneById = async (id: string) => {
    return this.repo.findOneBy({ id });
  };
  findByIds = async (...ids: string[]): Promise<Workout[]> => {
    return this.repo.find({ where: { id: In(ids) } });
  };
  findAll = async (_query: WOQuery, userId: string) => {
    const qb = this.repo.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.user', 'user');
    qb.leftJoinAndSelect('user.friends', 'friends');
    qb.orWhere('user.id = :userId', { userId });
    qb.orWhere('friends.id = :userId', { userId });

    // qb.where([
    //   'user.userId = :userID',
    //   { userID: userId },
    //   // 'friends.userId_2 = :userID',
    //   // { userID: userId },
    // ]);
    return  qb.getMany();
    //return this.repo.find();
  };

  create = async (input: WorkoutInput, userId: string) => {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException();

    const model = new Workout();
    Object.assign(model, input);
    model.user = user;
    const created = await this.repo.save(model);

    return created;
  };
  update = async (id: string) => {
    return {} as any;
  };
  async remove(id: string) {
    return this.repo.delete(id);
  }
}
