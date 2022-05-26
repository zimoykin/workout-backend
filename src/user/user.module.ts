import { Module } from '@nestjs/common';
import { DateScalar } from 'src/shared/scalar';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserResolver, UserService, DateScalar],
})
export class UserModule {}
