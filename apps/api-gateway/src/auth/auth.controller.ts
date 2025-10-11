import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

import { CreateUserDto } from '@contracts/users';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.register(dto);

    res
      .cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .sendStatus(201);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto);

    res
      .cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .sendStatus(200);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken').sendStatus(200);
  }
}
