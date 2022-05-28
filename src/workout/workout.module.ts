import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutResolver } from './workout.resolver';
import { DateScalar } from '../shared/scalar';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    WorkoutService,
    WorkoutResolver,
    DateScalar,
    AuthService,
    JwtService,
    UserService,
  ],
  imports: [ConfigModule.forRoot(), PassportModule, JwtModule.register({})],
})
export class WorkoutModule {}
