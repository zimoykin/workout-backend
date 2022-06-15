import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../domain/auth/models/auth.model';
import { User } from '../domain/user/models/user.model';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/shared/dto/userRole.dto';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly repoUser: Repository<User>,
    @InjectRepository(Auth) private readonly repoAuth: Repository<Auth>,
    private readonly config: ConfigService,
    private connection: DataSource,
  ) {}

  start = async () => {
    const email = this.config.get('ADMIN_EMAIL');
    const password = this.config.get('ADMIN_PASSWORD');
    const admin = await this.repoUser.find({ where: { email: email } });
    if (!admin.length && email && password && this.connection) {
      const queryRunner = this.connection.createQueryRunner();
      queryRunner.startTransaction();

      const user = this.repoUser.create({
        email,
        ...{
          firstName: 'Admin',
          lastName: 'Admin',
          role: UserRole.admin,
          weight: 75,
          age: 33,
        },
      });

      const auth = this.repoAuth.create();
      auth.hashPassword = password;
      try {
        const created = await queryRunner.manager.save(user);
        auth.user = created;
        await queryRunner.manager.save(auth);
        queryRunner
          .commitTransaction()
          .then(() => Logger.debug('seed created!'));
      } catch (e) {
        queryRunner.rollbackTransaction().then(() => {
          Logger.debug('there is problem with seeding database');
        });
        Logger.debug(e);
      }
    }
  };
}
