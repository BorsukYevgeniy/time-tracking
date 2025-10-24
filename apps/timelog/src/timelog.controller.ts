import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TimelogService } from './timelog.service';

import { SearchTimelogsDto, TIMELOG_PATTERNS } from '@contracts/timelog';

@Controller()
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @MessagePattern(TIMELOG_PATTERNS.FIND_LOGS)
  async findLogs(@Payload() data: SearchTimelogsDto & {userId: number}) {
    return await this.timelogService.findLogs(data.userId,data.startDate, data.endDate);
  }

  @MessagePattern(TIMELOG_PATTERNS.START)
  async start(@Payload(ParseIntPipe) userId: number) {
    return await this.timelogService.start(userId);
  }

  @MessagePattern(TIMELOG_PATTERNS.END)
  async end(@Payload(ParseIntPipe) userId: number) {
    return await this.timelogService.end(userId);
  }

}
