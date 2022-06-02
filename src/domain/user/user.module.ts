import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { DateScalar } from '../../shared/scalar';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/models/auth.model';
import { User } from './models/user.model';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Auth, User])],
  providers: [UserResolver, UserService, DateScalar, AuthService, JwtService],
})
export class UserModule {}
