import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TIMELOG_CLIENT } from '../timelog/constants';
import {
  TIMELOG_PATTERNS,
  Timelog,
  DateDto,
  SearchTimelogsDto,
} from '@contracts/timelog';
import { Report } from './types/report.type';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(
    @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy,
  ) {}

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
    const { endDate, startDate } = searchTimelogsDto;

    const [startDay, startMonth, startYear] = startDate
      .toString()
      .split('-')
      .map(Number);

    const [endDay, endMonth, endYear] = endDate
      .toString()
      .split('-')
      .map(Number);

    const start = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 1);
    const end = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);

    const timelogs = await firstValueFrom(
      this.timelogClient.send<Timelog[], SearchTimelogsDto>(
        TIMELOG_PATTERNS.FIND_LOGS,
        {
          userId,
          startDate: start,
          endDate: end,
        },
      ),
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
      this.timelogClient.send<Timelog[], SearchTimelogsDto>(
        TIMELOG_PATTERNS.FIND_LOGS,
        {
          userId,
          startDate,
          endDate,
        },
      ),
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

  console.log(startDate,endDate)

    const timelogs = await firstValueFrom(
      this.timelogClient.send<Timelog[], SearchTimelogsDto>(
        TIMELOG_PATTERNS.FIND_LOGS,
        {
          userId,
          startDate,
          endDate,
        },
      ),
    );

    return { totalHours: await this.getTotalHours(timelogs), timelogs };
  }

  async generateYearlyReport(userId: number): Promise<Report> {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const timelogs = await firstValueFrom(
      this.timelogClient.send<Timelog[], SearchTimelogsDto>(
        TIMELOG_PATTERNS.FIND_LOGS,
        {
          userId,
          startDate,
          endDate,
        },
      ),
    );

    return { totalHours: await this.getTotalHours(timelogs), timelogs };
  }
}
