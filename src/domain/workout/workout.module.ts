import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutResolver } from './workout.resolver';
import { DateScalar } from '../../shared/scalar';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/models/auth.model';
import { User } from '../user/models/user.model';
import { Workout } from './models/workout.model';
import { AwardService } from '../award/award.service';
import { Award } from '../award/models/award.model';

@Module({
  providers: [
    WorkoutService,
    WorkoutResolver,
    DateScalar,
    AuthService,
    JwtService,
    UserService,
    AwardService
  ],
  imports: [
    TypeOrmModule.forFeature([Auth, User, Workout, Award]),
    PassportModule,
    JwtModule.register({}),
  ],
})
export class WorkoutModule {}
