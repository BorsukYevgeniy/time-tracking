import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TimelogService } from './timelog.service';

@Injectable()
export class TimelogScheduler {
  constructor(private readonly timelogService: TimelogService) {}

  @Cron('0 0 3 * * *')
  async finisAllLogs() {
    return await this.timelogService.finishAllLogs()
  }
  
}
