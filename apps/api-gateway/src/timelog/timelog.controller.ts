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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { RequieredRoles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { TimelogService } from './timelog.service';

@Controller('timelog')
@ApiCookieAuth('accessToken')
@ApiUnauthorizedResponse({ description: 'Unathotized' })
@UseGuards(AuthGuard)
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @ApiOperation({ description: 'Get timelog by id' })
  @ApiParam({ type: Number, name: 'id', description: 'Id of timelog' })
  @ApiOkResponse({ description: 'Getted timelog by id' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id')
  @RequieredRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getById(@Param('id', ParseIntPipe) id: number): Observable<Timelog> {
    return this.timelogService.getById(id);
  }

  @ApiOperation({ description: 'Get all user logs by user Id or get all logs' })
  @ApiQuery({
    type: Number,
    name: 'userId',
    required: false,
    description: 'Id of user',
  })
  @ApiOkResponse({ description: 'Getted timelog by id' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @RequieredRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getLogsByUserId(
    @Query('userId', new ParseIntPipe({ optional: true })) userId: number,
  ): Observable<Timelog[]> {
    if (userId) return this.timelogService.getLogsByUserId(userId);

    return this.timelogService.getAllLogs();
  }

  @ApiOperation({ description: 'Start timelog' })
  @ApiCreatedResponse({ description: 'Started new timelog' })
  @Post('start')
  start(@User() user: JwtPayload): Observable<Timelog> {
    return this.timelogService.start(user.id);
  }

  @ApiOperation({ description: 'Finish timelog' })
  @ApiOkResponse({ description: 'Finish an open timelog' })
  @Post('end')
  @HttpCode(HttpStatus.OK)
  end(@User() user: JwtPayload): Observable<Timelog> {
    return this.timelogService.end(user.id);
  }
}
