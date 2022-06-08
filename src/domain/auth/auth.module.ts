import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../shared/security/strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './models/auth.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Auth, User]),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, UserService, JwtStrategy, AuthResolver],
  exports: [],
})
export class AuthModule {}
