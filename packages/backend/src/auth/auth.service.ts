import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PayloadUser } from './types';

type UserDetails = {
  email: string;
  displayName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.prismaService.user.upsert({
      where: { email: details.email },
      update: { ...details },
      create: { ...details },
    });

    return user;
  }

  // ToDO add typing for User
  async login(user: User) {
    console.log('login user', user);

    const payloadUser: PayloadUser = {
      displayName: user.displayName,
      id: user.id,
      email: user.email,
    };
    return {
      jwt: this.jwtService.sign({ user: payloadUser }),
    };
  }
}
