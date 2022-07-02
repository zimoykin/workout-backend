import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { Confirm } from './dto/confirm.dto';
import { Invite } from './models/invite.model';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite) private readonly repo: Repository<Invite>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private connection: DataSource,
  ) {}
  async create(requestedById: string, userId: string) {
    try {
      const from = await this.users.findOneBy({ id: requestedById });
      const to = await this.users.findOneBy({ id: userId });

      if (from && to) {
        const invite = this.repo.create({
          to,
          from,
        });

        return this.repo.save(invite);
      } else throw new BadRequestException();
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException();
    }
  }

  async confirm(userId: string, inviteId: string) {
    const invite = await this.repo.findOne({
      where: { id: inviteId },
      relations: ['from', 'to', 'from.friends', 'to.friends'],
    });
    if (invite) {
      if (invite.to.id === userId) {
        const queryRunner = this.connection.createQueryRunner();
        queryRunner.startTransaction();

        try {
          const user = invite.to;
          const other = invite.from;

          user.friends.push(invite.from);
          other.friends.push(invite.to);

          await queryRunner.manager.save(user);
          await queryRunner.manager.save(other);

          await queryRunner.manager.remove(invite);
          const confirmStatus = new Confirm();
          confirmStatus.status = 'confirm';

          queryRunner.commitTransaction();

          return confirmStatus;
        } catch (err) {
          queryRunner.rollbackTransaction();
          throw new BadRequestException();
        }
      } else throw new ForbiddenException();
    } else throw new BadRequestException();
  }
}
