import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './domain/user/user.module';
import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql';
import { upperDirectiveTransformer } from './shared/upper-case.directive';
import { ConfigModule } from '@nestjs/config';
import { WorkoutModule } from './domain/workout/workout.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './domain/auth/auth.module';
import { AwardModule } from './domain/award/award.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createUsersLoader } from './domain/user/user.loader';
import { UserService } from './domain/user/user.service';
import { createAwardsLoader } from './domain/award/award.loader';
import { AwardService } from './domain/award/award.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './domain/auth/auth.service';
import { Auth } from './domain/auth/models/auth.model';
import { User } from './domain/user/models/user.model';
import { MysqlDatabaseProviderModule } from './database/database.provider';
import { SeedService } from './seeding/seed.service';
import { SeederModule } from './seeding/seed.module';

const imports = [
  ConfigModule.forRoot(),
  MysqlDatabaseProviderModule,
  GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    imports: [UserModule, AwardModule],
    inject: [UserService, AwardService],
    useFactory: (usersService: UserService, awardService: AwardService) => ({
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema: GraphQLSchema) =>
        upperDirectiveTransformer(schema, 'upper'),
      context: () => ({
        usersLoader: createUsersLoader(usersService),
        awardsLoader: createAwardsLoader(awardService),
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
  imports: [
    WorkoutModule,
    AuthModule,
    UserModule,
    AwardModule,
    SeederModule,
    ...imports,
    TypeOrmModule.forFeature([Auth, User]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, SeedService],
})
export class AppModule {}
