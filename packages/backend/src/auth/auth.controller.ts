import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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

    return res.redirect(`http://localhost:5173?token=${jwt}`);
  }
}
