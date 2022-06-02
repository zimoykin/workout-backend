import { Injectable } from '@nestjs/common';
import { Repository } from '../../shared/database/repository';
import { WOQuery } from './dto/query';
import { WorkoutInput } from './dto/input';
import { Workout } from './models/workout.model';

@Injectable()
export class WorkoutService {
    repo: Repository<Workout>;
    constructor() {
      this.repo = new Repository(Workout);
    }
  

  async findOneById(id: string) {
    return this.repo.find(id);
  }
  async findAll(query: WOQuery) {
    return this.repo.findAll(query);
  }
  async create(input: WorkoutInput) {
    const model = new Workout();
    Object.assign(model, input);
    return this.repo.create(model);
  }
  async update(id: string) {
    return {} as any;
  }
  async remove(id: string) {
    return this.repo.remove(id);
  }
}
