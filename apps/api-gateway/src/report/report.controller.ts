import { DateDto } from '@contracts/timelog';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(AuthGuard)
@ApiCookieAuth('accessToken')
@ApiUnauthorizedResponse({ description: 'Unathotized' })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ description: 'Get report' })
  @ApiOkResponse({ description: 'Getted new report' })
  @ApiQuery({ type: DateDto })
  @Get()
  async getReport(
    @User() user: JwtPayload,
    @Query() searchTimelogsDto: DateDto,
  ) {
    return await this.reportService.generateReport(user.id, searchTimelogsDto);
  }

  @ApiOperation({ description: 'Get daily report' })
  @ApiOkResponse({ description: 'Getted new daily report' })
  @Get('daily')
  async getDailyReport(@User() user: JwtPayload) {
    return await this.reportService.generateDailyReport(user.id);
  }
  @ApiOperation({ description: 'Get monthly report' })
  @ApiOkResponse({ description: 'Getted new monthly report' })
  @Get('monthly')
  async getMonthlyReport(@User() user: JwtPayload) {
    return await this.reportService.generateMonthlyReport(user.id);
  }

  @ApiOperation({ description: 'Get yearly report' })
  @ApiOkResponse({ description: 'Getted new yearly report' })
  @Get('yearly')
  async getYearlyReport(@User() user: JwtPayload) {
    return await this.reportService.generateYearlyReport(user.id);
  }
}
