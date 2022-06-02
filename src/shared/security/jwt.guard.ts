import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../../domain/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    let { req } = ctx.getContext();
    return req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const cntX = ctx.getContext();
    if (!cntX.req.headers.authorization) return false;
    else {
      const [id, role] = await this.validate(cntX.req.headers.authorization);
      if (id && role) {
        cntX.req.auth = { id, role };
      }
      return id !== undefined;
    }
  }

  async validate(token: string): Promise<[string, string] | undefined> {
    const tokenKey = token.split(' ');
    if (tokenKey.length === 2 && tokenKey[0] === 'Bearer' && tokenKey[1]) {
      const result = await this.service.verify(token);
      if (result) {
        return result;
      } else return undefined;
    } else return undefined;
  }
}
