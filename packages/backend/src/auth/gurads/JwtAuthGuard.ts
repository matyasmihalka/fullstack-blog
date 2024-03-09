import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('JwtAuthGuard');
    // Convert the execution context into a GQL execution context
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    console.log('request', request);
    const token = request.cookies['Authentication'];

    console.log('token', token);
    if (!token) {
      return false;
    }
    try {
      console.log('token', token, this.jwtService.verify(token));
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Optionally attach user info to the request
      return true;
    } catch (e) {
      return false;
    }
  }
}
