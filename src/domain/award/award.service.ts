import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAwardInput } from './dto/input.dto';
import { Award as Model } from './models/award.model';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Model) private readonly repo: Repository<Model>,
  ) {}

  findOneById = async (id: string) => this.repo.findOneBy({ id });
  findAll = async (query: any) => this.repo.find(query);
  create = async (input: IAwardInput) => {
    const model = new Model();
    Object.assign(model, input);
    return this.repo.create(model);
  };
  update = async (id: string, update: any) => this.repo.update(id, update);
  remove = async (id: string) => this.repo.delete(id);
}
