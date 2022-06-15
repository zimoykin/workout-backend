import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { Confirm } from './dto/confirm.dto';
import { Invite } from './models/invite.model';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite) private readonly repo: Repository<Invite>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async create(requestedById: string, userId: string) {
    try {
      const inviter = await this.users.findOneBy({ id: requestedById });
      const toUser = await this.users.findOneBy({ id: userId });

      const invite = this.repo.create({
        invite: toUser,
        requestedBy: inviter,
      });

      return this.repo.save(invite);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException();
    }
  }

  async confirm(userId: string, inviteId: string) {
    const invite = await this.repo.findOne({ where: { id: inviteId } });
    if (invite) {
      if (invite.invite.id === userId) {
        const user = invite.invite;
        const other = invite.requestedBy;
        user.friends.push(invite.requestedBy);
        other.friends.push(invite.invite);
        await this.users.save(user);
        await this.users.save(other);
        await this.repo.delete(inviteId);
        return new Confirm();
      } else throw new ForbiddenException();
    } else throw new BadRequestException();
  }
}
