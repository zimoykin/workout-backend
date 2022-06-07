import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  port: 3306,
  host: process.env.MODE === 'DEV' ? 'localhost' : 'db',
  username: 'user',
  password: 'password',
  database: 'workout_db',
  synchronize: true,
  logging: ['query', 'error'],
  entities: [__dirname + '/src/**/*.model{.ts,.js}'],
  subscribers: [__dirname + '/src/subscribers/**/*{.ts,.js}'],
  migrations: [__dirname + '/src/migration/*{.ts,.js}'],
};
