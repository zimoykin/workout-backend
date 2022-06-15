import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../domain/auth/models/auth.model";
import { User } from "../domain/user/models/user.model";

@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forFeature([Auth, User])
    ],
    providers: [],
    exports: [],
  })
  export class SeederModule {}