import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Mongo } from './shared/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //database connection
  const mongo = Mongo.getInstance();
  mongo.on('connected', () => {
    Logger.debug(
      `[MONGO] database connected ${mongo.database.db().databaseName}`,
    );
  });

  const options = new DocumentBuilder()
    .setTitle('Workout')
    .setDescription('The workout API description')
    .setVersion('1.0')
    .addTag('App')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //start app
  await app.listen(8084);
  Logger.debug(`Application launched on: ${await app.getUrl()}`);
}
bootstrap();
