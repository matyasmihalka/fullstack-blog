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
    // Convert the execution context into a GQL execution context
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.cookies['Authentication'];

    console.log('token', token);

    if (!token) {
      console.log('throwing');
      throw new UnauthorizedException('Authentication token not found.');
    }
    try {
      console.log('token', token, this.jwtService.verify(token));
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Optionally attach user info to the request
      return true;
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token.',
      );
    }
  }
}
