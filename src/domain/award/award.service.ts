import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwardsTypes, IAwardT } from '../../shared/types';
import {
  In,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Workout } from '../workout/models/workout.model';
import { IAwardInput } from './dto/input.dto';
import { Award, Award as Model } from './models/award.model';
import { User } from '../user/models/user.model';
import { AwardArgs } from './dto/query.dto';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Model) private readonly repo: Repository<Model>,
    @InjectRepository(Workout) private readonly workouts: Repository<Workout>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findOneById = async (id: string) => this.repo.findOneBy({ id });
  findAll = async (query?: AwardArgs & { userId: string }) => {
    const qb = this.repo.createQueryBuilder('model');
    qb.where('model.userId = :userId', { userId: query.userId });
    if (query.interval) {
      qb.where({ createdAt: MoreThanOrEqual(query.interval.from) });
      qb.where({ createdAt: LessThanOrEqual(query.interval.to) });
    }
    if (query.awardType) {
      qb.where('model.awardType LIKE :awardType', {
        awardType: `%${query.awardType}%`,
      });
    }
    return qb.getMany();
  };
  findByIds = async (...ids: string[]): Promise<Model[]> => {
    return this.repo.find({ where: { id: In(ids) } });
  };
  findByUserId = async (...userId: string[]) => {
    return this.repo.find({ where: { userId: In(userId) } });
  };
  create = async (input: IAwardInput) => {
    const model = new Model();
    Object.assign(model, input);
    return this.repo.create(model);
  };
  updateAwards = async (userId: string) => {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) return;

    const [start, end] = [
      () => {
        const date = new Date();
        date.setHours(0, 0, 0);
        return date;
      },
      () => {
        const date = new Date();
        date.setHours(23, 59, 29);
        return date;
      },
    ];

    const qb = this.workouts.createQueryBuilder();
    qb.where({
      createdAt: MoreThanOrEqual(start()),
    })
      .where({
        createdAt: LessThanOrEqual(end()),
      })
      .where('userId = :userId', { userId });
    qb.select('Sum(calories)', 'summary');
    const { summary } = await qb.getRawOne();

    let awardAchieved = undefined as IAwardT;
    for (let i = AwardsTypes.length; i--; AwardsTypes.length) {
      if (AwardsTypes[i].size <= summary) {
        console.log(AwardsTypes[i]);
        awardAchieved = AwardsTypes[i];
        break;
      }
    }

    if (awardAchieved) {
      const qb_awards = this.repo.createQueryBuilder();
      qb_awards.where('userId = :userId', { userId });
      qb_awards.where({ createdAt: MoreThanOrEqual(start()) });
      qb_awards.where({ createdAt: LessThanOrEqual(end()) });

      const exist = await qb_awards.getOne();
      if (exist) {
        exist.score = summary;
        exist.awardType = awardAchieved.title;
        this.repo
          .save(exist)
          .then((awards_created) => {
            console.log(awards_created);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const award_new = new Award();
        award_new.score = summary;
        award_new.awardType = awardAchieved.title;
        award_new.user = user;
        this.repo
          .save(award_new)
          .then((awards_created) => {
            console.log(awards_created);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    console.log(summary);
  };
  remove = async (id: string) => this.repo.delete(id);
}
