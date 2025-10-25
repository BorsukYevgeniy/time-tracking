import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtPayload } from '../types/jwt-payload.type';
import { User } from '../decorators/user.decorator';
import { DateDto } from '@contracts/timelog';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReport(
    @User() user: JwtPayload,
    @Query() searchTimelogsDto: DateDto,
  ) {
    return this.reportService.generateReport(user.id, searchTimelogsDto);
  }

  @Get('daily')
  async getDailyReport(@User() user: JwtPayload) {
    return this.reportService.generateDailyReport(user.id);
  }

  @Get('monthly')
  async getMonthlyReport(@User() user: JwtPayload) {
    return this.reportService.generateMonthlyReport(user.id);
  }

  @Get('yearly')
  async getYearlyReport(@User() user: JwtPayload) {
    return this.reportService.generateYearlyReport(user.id);
  }
}
