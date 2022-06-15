import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteResolver } from './invite.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './models/invite.model';
import { User } from '../user/models/user.model';
import { Auth } from '../auth/models/auth.model';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invite, User, Auth])],
  providers: [
    InviteService,
    AuthService,
    UserService,
    InviteResolver,
    JwtService,
  ],
})
export class InviteModule {}
