import { Timelog } from '@contracts/timelog';
import { Role } from '@contracts/users';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequieredRoles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { TimelogService } from './timelog.service';

@Controller('timelog')
@UseGuards(AuthGuard)
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @Get(':id')
  @RequieredRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getById(@Param('id', ParseIntPipe) id: number): Observable<Timelog> {
    return this.timelogService.getById(id);
  }

  @Post('start')
  start(@User() user: JwtPayload): Observable<Timelog> {
    return this.timelogService.start(user.id);
  }

  @Post('end')
  @HttpCode(HttpStatus.OK)
  end(@User() user: JwtPayload): Observable<Timelog> {
    return this.timelogService.end(user.id);
  }
}
