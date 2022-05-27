import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Mongo } from './shared/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //database connection
  const mongo = Mongo.getInstance();
  mongo.on('connected', () => {
    Logger.log(
      `[MONGO] database connected ${mongo.database.db().databaseName}`,
    );
  });

  //start app
  await app.listen(8084);
  Logger.debug(`Application launched on: ${await app.getUrl()}`);
}
bootstrap();
