import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { CreateUserDto } from '@contracts/users';
import { AuthGuard } from './guard/auth.guard';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Register new user' })
  @ApiCreatedResponse({ description: 'Registered user' })
  @ApiBadRequestResponse({ description: 'Invalid DTO or credentials' })
  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.register(dto);

    res
      .cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(201)
      .end();
  }

  @ApiOperation({ description: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login user' })
  @ApiBadRequestResponse({ description: 'Invalid DTO or credentials' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto);

    res
      .cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .end();
  }

  @ApiOperation({ description: 'Logout' })
  @ApiCookieAuth('accessToken')
  @ApiOkResponse({ description: 'Logout user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken').status(200).end();
  }
}
