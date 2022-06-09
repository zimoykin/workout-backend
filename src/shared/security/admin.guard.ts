import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../../domain/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.auth;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const cntX = ctx.getContext();
    if (!cntX.req.headers.authorization) return false;
    else {
      const res = await this.validate(cntX.req.headers.authorization);
      cntX.auth = res;
      return res === undefined ? false : true;
    }
  }

  async validate(token: string): Promise<[string, string] | undefined> {
    const tokenKey = token.split(' ');
    if (tokenKey.length === 2) {
      if (tokenKey[0] === 'Bearer' && tokenKey[1]) {
        const [id, role] = await this.service.verify(tokenKey[1]);
        if (id && role && role === 'admin') {
          return [id, role];
        } else return undefined;
      } else return undefined;
    } else return undefined;
  }
}
