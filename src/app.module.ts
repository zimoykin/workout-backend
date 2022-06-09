import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './domain/user/user.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './shared/upper-case.directive';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkoutModule } from './domain/workout/workout.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './domain/auth/auth.module';
import { AwardModule } from './domain/award/award.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { createUsersLoader } from './domain/user/user.loader';
import { UserService } from './domain/user/user.service';
import { User } from './domain/user/models/user.model';
import { Auth } from './domain/auth/models/auth.model';

const imports = [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot(config),
  GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    imports: [UserModule],
    inject: [UserService],
    useFactory: (usersService: UserService) => ({
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      context: () => ({
        usersLoader: createUsersLoader(usersService),
      }),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  }),
  JwtModule,
];

@Module({
  imports: [WorkoutModule, AuthModule, UserModule, AwardModule, ...imports],
  controllers: [],
  providers: [],
})
export class AppModule {}
