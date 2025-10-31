import { DateDto, Timelog } from '@contracts/timelog';
import { Injectable } from '@nestjs/common';
import { Report } from './types/report.type';

import { firstValueFrom } from 'rxjs';
import { TimelogService } from '../timelog/timelog.service';

@Injectable()
export class ReportService {
  constructor(private readonly timelogService: TimelogService) {}

  private async getTotalHours(timelogs: Timelog[]): Promise<number> {
    const totalTimeMs = timelogs.reduce((acc, tl) => {
      if (!tl.end) return acc;

      const { start, end } = tl;

      const duration = new Date(end).getTime() - new Date(start).getTime();
      return acc + duration;
    }, 0);

    return totalTimeMs / (1000 * 60 * 60);
  }

  async generateReport(
    userId: number,
    searchTimelogsDto: DateDto,
  ): Promise<Report> {
    const timelogs = await firstValueFrom(
      this.timelogService.searchLogs({
        userId,
        ...searchTimelogsDto,
      }),
    );

    return {
      totalHours: await this.getTotalHours(timelogs),
      timelogs,
    };
  }

  async generateDailyReport(userId: number): Promise<Report> {
    const now = new Date();

    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const timelogs = await firstValueFrom(
      this.timelogService.searchLogs({
        userId,
        endDate,
        startDate,
      }),
    );

    return { totalHours: await this.getTotalHours(timelogs), timelogs };
  }

  async generateMonthlyReport(userId: number): Promise<Report> {
    const now = new Date();

    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
    const timelogs = await firstValueFrom(
      this.timelogService.searchLogs({
        userId,
        endDate,
        startDate,
      }),
    );

    return { totalHours: await this.getTotalHours(timelogs), timelogs };
  }

  async generateYearlyReport(userId: number): Promise<Report> {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const timelogs = await firstValueFrom(
      this.timelogService.searchLogs({
        userId,
        endDate,
        startDate,
      }),
    );

    return { totalHours: await this.getTotalHours(timelogs), timelogs };
  }
}
