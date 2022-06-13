import { Injectable, NotFoundException } from '@nestjs/common';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout } from './models/workout.model';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { AwardService } from '../award/award.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private readonly repo: Repository<Workout>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly awards: AwardService,
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
    qb.where('user.id = :userId', { userId });

    if (_query?.bpm) {
      qb.where('model.bpm >= :bpm', { bpm: _query.bpm });
    }

    if (_query?.minCalories) {
      qb.where('model.calories >= :minCalories', {
        minCalories: _query.minCalories,
      });
    }

    if (_query?.page) {
      qb.take(_query.page.limit || 10).skip(
        Math.max(_query.page.page - 1, 0) || 0,
      );
    }
    return qb.getMany();
  };

  findAllByUserId = async (userId: string) => {
    return this.repo.find({ where: { id: userId } });
  };
  create = async (input: WorkoutInput, userId: string) => {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException();

    const model = new Workout();
    Object.assign(model, input);
    model.user = user;
    const created = await this.repo.save(model);
    this.awards.updateAwards(userId);
    return created;
  };

  update = async (id: string) => {
    return {} as any;
  };
  async remove(id: string) {
    return this.repo.delete(id);
  }
}
