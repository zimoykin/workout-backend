import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './domain/user/user.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './shared/upper-case.directive';
import { ConfigModule } from '@nestjs/config';
import { WorkoutModule } from './domain/workout/workout.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './domain/auth/auth.module';
import { AwardModule } from './domain/award/award.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const imports = [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MODE === 'DEV' ? 'localhost' : 'db',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'workout_db',
    entities: [],
    synchronize: true,
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
    transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    buildSchemaOptions: {
      directives: [
        new GraphQLDirective({
          name: 'upper',
          locations: [DirectiveLocation.FIELD_DEFINITION],
        }),
      ],
    },
  }),
  JwtModule,
];

@Module({
  imports: [...imports, WorkoutModule, AuthModule, UserModule, AwardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
