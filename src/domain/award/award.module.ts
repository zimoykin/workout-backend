import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/models/auth.model';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { AwardResolver } from './award.resolver';
import { AwardService } from './award.service';
import { Award } from './models/award.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Award, User]),
  ],
  providers: [AwardResolver, AwardService, AuthService, UserService, JwtService, AuthService],
})
export class AwardModule {}
