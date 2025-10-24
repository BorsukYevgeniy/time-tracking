import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtPayload } from '../types/jwt-payload.type';
import { User } from '../decorators/user.decorator';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

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

