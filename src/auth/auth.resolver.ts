import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { IStatusResponse } from 'src/shared/dto/status.dto';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/args.dto';
import { ITokens } from './dto/tokens.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation((of) => ITokens)
  async login(@Args('loginArgs') loginArgs: LoginInput): Promise<ITokens> {
    return this.service.login(loginArgs);
  }
  @Mutation((of) => IStatusResponse)
  async register(
    @Args('registerArgs') registerArgs: RegisterInput,
  ): Promise<{ status: string }> {
    return this.service.register(registerArgs);
  }
}
