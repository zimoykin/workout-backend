import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const cntX = ctx.getContext();
    if (!cntX.req.headers.authorization) return false;
    else {
      return await this.validate(cntX.req.headers.authorization);
    }
  }

  async validate(token: string): Promise<boolean> {
    const tokenKey = token.split(' ');
    if (tokenKey.length === 2) {
      if (tokenKey[0] === 'Bearer' && tokenKey[1]) {
        const result = await this.service.verify(tokenKey[1]);
        if (result) {
          return result.role === 'admin';
        } else return false;
      } else return false;
    } else return false;
  }
}
