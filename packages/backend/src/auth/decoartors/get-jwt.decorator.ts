import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies['Authentication'] || null; // Assuming 'Authentication' is your cookie name
  },
);
