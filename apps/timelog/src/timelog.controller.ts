import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TimelogService } from './timelog.service';

import {
  SearchTimelogsDto,
  Timelog,
  TIMELOG_PATTERNS,
} from '@contracts/timelog';

@Controller()
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @MessagePattern(TIMELOG_PATTERNS.GET_ALL)
  async getAll(): Promise<Timelog[]> {
    return await this.timelogService.getAll();
  }

  @MessagePattern(TIMELOG_PATTERNS.GET_BY_ID)
  async getById(@Payload(ParseIntPipe) id: number): Promise<Timelog> {
    return await this.timelogService.getById(id);
  }

  @MessagePattern(TIMELOG_PATTERNS.GET_LOGS_BY_USER_ID)
  async getLogsByUserId(
    @Payload(ParseIntPipe) userId: number,
  ): Promise<Timelog[]> {
    return await this.timelogService.getLogsByUserId(userId);
  }

  @MessagePattern(TIMELOG_PATTERNS.FIND_LAST_TIMELOG)
  async getLastTimelog(
    @Payload(ParseIntPipe) userId: number,
  ): Promise<Timelog> {
    return await this.timelogService.getLastTimelog(userId);
  }

  @MessagePattern(TIMELOG_PATTERNS.FIND_LOGS)
  async findLogs(@Payload() searchDto: SearchTimelogsDto): Promise<Timelog[]> {
    return await this.timelogService.findLogs(searchDto);
  }

  @MessagePattern(TIMELOG_PATTERNS.START)
  async start(@Payload(ParseIntPipe) userId: number): Promise<Timelog> {
    return await this.timelogService.start(userId);
  }

  @MessagePattern(TIMELOG_PATTERNS.END)
  async end(@Payload(ParseIntPipe) userId: number): Promise<Timelog> {
    return await this.timelogService.end(userId);
  }
}
