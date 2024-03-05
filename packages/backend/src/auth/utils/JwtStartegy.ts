import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensures the token has not expired
      secretOrKey: process.env.JWT_SECRET, // Same secret as used in JwtModule
    });
  }

  async validate(payload: any) {
    // This method is called after the token is verified. You can perform additional validation or fetch user details here.
    // The returned value will be injected into the request object.
    console.log('validating form JWT strategy: ', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
