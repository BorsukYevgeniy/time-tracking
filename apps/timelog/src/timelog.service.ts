import { SearchTimelogsDto } from '@contracts/timelog';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Timelog } from './timelog.entity';
import { TimelogRepository } from './timelog.repository';

@Injectable()
export class TimelogService {
  constructor(private readonly timelogRepository: TimelogRepository) {}

  async getAll(): Promise<Timelog[]> {
    return await this.timelogRepository.getAll();
  }

  async getById(id: number): Promise<Timelog> {
    const timelog = await this.timelogRepository.getById(id);

    if (!timelog) throw new RpcException(new NotFoundException());

    return timelog;
  }

  async getLogsByUserId(userId: number) {
    return await this.timelogRepository.getLogsByUserId(userId);
  }

  async finishAllLogs() {
    return await this.timelogRepository.finishAllLogs();
  }

  async getLastUserTimelog(userId: number): Promise<Timelog | null> {
    return await this.timelogRepository.getLastUserTimelog(userId);
  }

  async searchLogs(searchDto: SearchTimelogsDto): Promise<Timelog[]> {
    return await this.timelogRepository.searchLogs(searchDto);
  }

  async start(userId: number): Promise<Timelog> {
    const lastLog = await this.timelogRepository.getLastUserTimelog(userId);
    if (lastLog && !lastLog.end) {
      throw new RpcException(
        new BadRequestException('User already has an active timelog'),
      );
    }

    return await this.timelogRepository.start(userId);
  }

  async end(userId: number): Promise<Timelog> {
    const lastLog = await this.timelogRepository.getLastUserTimelog(userId);
    if (lastLog && lastLog.end && lastLog.start) {
      throw new RpcException(
        new BadRequestException('User dont have an active timelog'),
      );
    }

    return await this.timelogRepository.end(userId);
  }
}
