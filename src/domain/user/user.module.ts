import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { DateScalar } from '../../shared/scalar';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [UserResolver, UserService, DateScalar, AuthService, JwtService],
})
export class UserModule {}
