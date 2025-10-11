import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { TimelogService } from './timelog.service';
import { AuthRequest } from '../types/auth-request.type';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('timelog')
@UseGuards(AuthGuard)
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @Post('start')
  async start(@Req() req: AuthRequest) {
    return await this.timelogService.start(req.user.id);
  }

  @Post('end')
  @HttpCode(HttpStatus.OK)
  async end(@Req() req: AuthRequest) {
    return await this.timelogService.end(req.user.id);
  }
}
