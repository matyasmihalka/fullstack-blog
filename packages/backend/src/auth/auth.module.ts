import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './gurads/JwtAuthGuard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    PrismaService,
    JwtAuthGuard,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
