import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

import { CreateUserDto, Role } from '@contracts/users';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorator/roles.decorator';

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
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken').sendStatus(200);
  }
}
