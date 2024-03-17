import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PayloadUser, isValidPayloadUser } from '../types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpRequest = context.switchToHttp().getRequest();
    const graphqlCtx = GqlExecutionContext.create(context);
    const graphQlRequest = graphqlCtx.getContext().req;

    let token = '';

    if (httpRequest) {
      token = httpRequest.cookies['Authentication'];
    } else if (graphQlRequest) {
      token = graphQlRequest.cookies['Authentication'];
    } else {
      throw new Error('Could not find request object in context');
    }

    if (!token) {
      throw new UnauthorizedException('Authentication token not found.');
    }
    try {
      // decoded contains iat and exp fields additionally
      const decoded = this.jwtService.verify(token);

      // Attach the user info to the request for HTTP request to make it available for user validation
      if (httpRequest) {
        const user = this.verifyPayload(decoded);
        httpRequest.user = user;
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token.',
      );
    }
  }

  protected verifyPayload(decoded: any): PayloadUser {
    if (isValidPayloadUser(decoded.user)) {
      const user = decoded.user;
      return user as PayloadUser;
    } else {
      // Handle the case where the decoded token does not match the expected structure
      throw new Error('Invalid token payload, user not present');
    }
  }
}
