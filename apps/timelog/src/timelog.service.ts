import { Injectable } from '@nestjs/common';
import { Timelog } from './timelog.entity';
import { TimelogRepository } from './timelog.repository';
import { SearchTimelogsDto } from '@contracts/timelog';

@Injectable()
export class TimelogService {
  constructor(private readonly timelogRepository: TimelogRepository) {}

  async finishAllLogs() {
    return await this.timelogRepository.finishAllLogs();
  }

  async getLastTimelog(userId: number): Promise<Timelog | null> {
    return await this.timelogRepository.getLastTimelog(userId);
  }

  async findLogs(searchDto: SearchTimelogsDto): Promise<Timelog[]> {
    return await this.timelogRepository.findLogs(searchDto);
  }

  async start(userId: number): Promise<Timelog> {
    return await this.timelogRepository.start(userId);
  }

  async end(userId: number): Promise<Timelog> {
    return await this.timelogRepository.end(userId);
  }
}
