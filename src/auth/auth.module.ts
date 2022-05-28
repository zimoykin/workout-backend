import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../shared/security/strategies/jwt.strategy';
import { LocalStrategy } from '../shared/security/strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
  ],
  exports: [],
})
export class AuthModule {}
