import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/JwtAuthGuard';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  handleLogin() {
    return { message: 'Redirect to Google' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  handleRedirect(
    @Req() req: { user: { accessToken: string } },
    @Res() res: any,
  ) {
    const jwt = req.user.accessToken;

    // Set the JWT in an HTTP-only cookie
    res.cookie('Authentication', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Strictly same site
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours for example
    });

    const origin = process.env.FE_URL;

    return res.redirect(origin);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate(/*@Req()  req: Request */) {
    // If the request reaches this point, it means the JWT is valid
    // You can return any user-related information as needed, or simply an acknowledgment
    return {
      valid: true,
      // userId: req.user.userId,
      // username: req.user.username,
    };
  }

  @Get('logout')
  async logout(@Res() response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    return response.sendStatus(200);
  }
}
