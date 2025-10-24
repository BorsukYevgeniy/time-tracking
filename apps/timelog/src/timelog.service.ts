import { Injectable } from '@nestjs/common';
import { Timelog } from './timelog.entity';
import { TimelogRepository } from './timelog.repository';

@Injectable()
export class TimelogService {
  constructor(
    private readonly timelogRepository: TimelogRepository,
  ) {}

  async findLogs(userId: number, startDate: Date, endDate: Date): Promise<Timelog[]>{
    return await this.timelogRepository.findLogs(userId, startDate, endDate)
  }

  async start(userId: number): Promise<Timelog> {
    return await this.timelogRepository.start(userId)
  }

  async end(userId: number): Promise<Timelog> {
    return await this.timelogRepository.end(userId)
  }
}
