import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends NestAuthGuard('jwt') {
  constructor() {
    super();
  }

  public override async getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext();

    req.body = ctx.getArgs().authCredentialInput;

    return req;
  }
}
