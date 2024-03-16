import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const graphqlCtx = GqlExecutionContext.create(context);
    const httpRequest = context.switchToHttp().getRequest();

    const graphQlRequest = graphqlCtx.getContext().req;

    let token = '';

    if (httpRequest) {
      token = httpRequest.cookies['Authentication'];
    } else if (graphQlRequest) {
      token = graphQlRequest.cookies['Authentication'];
    } else {
      throw new Error('Could not find request object in context');
    }

    // const request =
    //   ctx.getType() === 'http'
    //     ? context.switchToHttp().getRequest()
    //     : ctx.getContext().req;

    // const token = request.cookies['Authentication'];

    console.log('token', token);

    if (!token) {
      console.log('throwing');
      throw new UnauthorizedException('Authentication token not found.');
    }
    try {
      console.log('token', token, this.jwtService.verify(token));
      // const decoded = this.jwtService.verify(token);
      // request.user = decoded; // Optionally attach user info to the request
      return true;
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token.',
      );
    }
  }
}
