import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TimelogService } from './timelog.service';
import { AuthRequest } from '../common/types/auth-request.type';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Observable } from 'rxjs';
import { Timelog } from '@contracts/timelog';

@Controller('timelog')
@UseGuards(AuthGuard)
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @Post('start')
  start(@Req() req: AuthRequest): Observable<Timelog> {
    return this.timelogService.start(req.user.id);
  }

  @Post('end')
  @HttpCode(HttpStatus.OK)
  end(@Req() req: AuthRequest): Observable<Timelog> {
    return this.timelogService.end(req.user.id);
  }
}
