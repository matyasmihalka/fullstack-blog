import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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

    return res.redirect(`http://localhost:5173`);
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
