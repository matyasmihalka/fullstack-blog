import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type UserDetails = {
  email: string;
  displayName: string;
};

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(details: UserDetails) {
    console.log('auth service: ', details);

    const user = await this.prismaService.user.upsert({
      where: { email: details.email },
      update: { ...details },
      create: { ...details },
    });

    console.log('user from DB: ', user);

    return user;
  }
}
