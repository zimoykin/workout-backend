import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IStatusResponse } from '../../shared/dto/status.dto';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.dto';
import { RegisterInput } from './dto/register.dto';
import { ITokens } from './dto/tokens.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}
  @Mutation((of) => IStatusResponse)
  async register(
    @Args('registerArgs') registerArgs: RegisterInput,
  ): Promise<{ status: string }> {
    return this.service.register(registerArgs);
  }
  @Mutation((of) => ITokens)
  async login(@Args('loginArgs') loginArgs: LoginInput): Promise<ITokens> {
    return this.service.login(loginArgs);
  }
  @Mutation((of) => ITokens)
  async refresh(@Args('refreshToken') refreshToken: string): Promise<ITokens> {
    return this.service.refresh(refreshToken);
  }
}
