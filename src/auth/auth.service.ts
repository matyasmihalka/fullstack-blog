import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

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
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
