import { Injectable, NotFoundException } from '@nestjs/common';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout } from './models/workout.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models/user.model';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private readonly repo: Repository<Workout>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOneById(id: string) {
    return this.repo.findOneBy({ id });
  }
  async findAll(_query: WOQuery, userId: string) {
   
    const qb = this.repo.createQueryBuilder('model');
    qb.innerJoinAndSelect('model.user', 'user')
    qb.where('user.id = :userId', { userId })
    return qb.getMany();

  }
  async create(input: WorkoutInput, userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException();
    
    const model = new Workout();
    Object.assign(model, input);
    model.user = user;
    const created = await this.repo.save(model);

    return created;
  }
  async update(id: string) {
    return {} as any;
  }
  async remove(id: string) {
    return this.repo.delete(id);
  }
}
