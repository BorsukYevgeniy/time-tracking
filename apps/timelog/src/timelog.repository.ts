import { Injectable, NotFoundException } from '@nestjs/common';
import { Timelog } from './timelog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SearchTimelogsDto } from '@contracts/timelog';

@Injectable()
export class TimelogRepository {
  constructor(
    @InjectRepository(Timelog)
    private readonly timelogRepository: Repository<Timelog>,
  ) {}

  async getLastTimelog(userId: number) {
    return await this.timelogRepository.findOne({
      where: { userId },
      order: { start: 'DESC' },
    });
  }

  async findLogs(searchDto: SearchTimelogsDto): Promise<Timelog[]> {
    return await this.timelogRepository.find({
      where: {
        userId: searchDto.userId,
        start: Between(searchDto.startDate, searchDto.endDate),
      },
    });
  }

  async start(userId: number): Promise<Timelog> {
    return await this.timelogRepository.save({
      start: new Date(),
      end: null,
      userId,
    });
  }

  async end(userId: number): Promise<Timelog> {
    const timelog = await this.timelogRepository
      .createQueryBuilder('timelog')
      .where('timelog.userId = :userId', { userId })
      .andWhere('timelog.end IS NULL')
      .getOne();

    if (!timelog) {
      throw new NotFoundException('Active timelog not found');
    }

    const endDate = new Date();

    await this.timelogRepository
      .createQueryBuilder()
      .update(Timelog)
      .set({ end: endDate })
      .where('id = :id', { id: timelog.id })
      .execute();

    return {
      ...timelog,
      end: endDate,
    };
  }
}
