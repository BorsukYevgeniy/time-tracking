import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TIMELOG_CLIENT } from '../timelog/constants';
import { TIMELOG_PATTERNS, Timelog } from '@contracts/timelog';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(
    @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy,
  ) {}

  async generateDailyReport(userId: number) {
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

    const timelogs: Timelog[] = await firstValueFrom(
      this.timelogClient.send(TIMELOG_PATTERNS.FIND_LOGS, {
        userId,
        startDate, 
        endDate
      }),
    );

    const totalTime = timelogs.reduce((acc, tl) => {
      if (!tl.end) return acc;

      const duration = tl.end.getTime() - tl.start.getTime();
      return acc + duration;
    }, 0);

    return { totalTime: totalTime / (1000 * 60 * 60), timelogs };
  }
  
  async generateMonthlyReport(userId: number) {
    const now = new Date();

    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDay(),
      0,
      0,
      0,
      0,
    );
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDay(),
      23,
      59,
      59,
      999,
    );

    const timelogs: Timelog[] = await firstValueFrom(
      this.timelogClient.send<Timelog[]>(TIMELOG_PATTERNS.FIND_LOGS, {
        userId,
        startDate,
        endDate,
      }),
    );

    const totalTimeMs = timelogs.reduce((acc, tl) => {
      if (!tl.end) return acc;

      return acc + (tl.end.getTime() - tl.start.getTime());
    }, 0);

    return { totalHours: totalTimeMs / (1000 * 60 * 60), timelogs };
  }

  async generateYearlyReport(userId: number) {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const timelogs: Timelog[] = await firstValueFrom(
      this.timelogClient.send<Timelog[]>(TIMELOG_PATTERNS.FIND_LOGS, {
        userId,
        startDate,
        endDate,
      }),
    );

    const totalTimeMs = timelogs.reduce((acc, tl) => {
      if (!tl.end) return acc;
      return acc + (tl.end.getTime() - tl.start.getTime());
    }, 0);

    return { totalHours: totalTimeMs / (1000 * 60 * 60), timelogs };
  }

}
