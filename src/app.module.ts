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

const imports = [
  ConfigModule.forRoot(),
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
  JwtModule
];

@Module({
  imports: [...imports, WorkoutModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
