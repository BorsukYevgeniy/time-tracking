import { SearchTimelogsDto } from '@contracts/timelog';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Timelog } from './timelog.entity';

@Injectable()
export class TimelogRepository {
  constructor(
    @InjectRepository(Timelog)
    private readonly repo: Repository<Timelog>,
  ) {}

  async getAll(): Promise<Timelog[]> {
    return await this.repo.find();
  }

  async getLogsByUserId(userId: number): Promise<Timelog[]> {
    return await this.repo.find({ where: { userId } });
  }

  async getById(id: number): Promise<Timelog> {
    return await this.repo.findOne({ where: { id } });
  }

  async finishAllLogs() {
    return await this.repo.updateAll({ end: new Date() });
  }

  async getLastUserTimelog(userId: number) {
    return await this.repo.findOne({
      where: { userId },
      order: { start: 'DESC' },
    });
  }

  async searchLogs(searchDto: SearchTimelogsDto): Promise<Timelog[]> {
    return await this.repo.find({
      where: {
        userId: searchDto.userId,
        start: Between(searchDto.startDate, searchDto.endDate),
      },
    });
  }

  async start(userId: number): Promise<Timelog> {
    return await this.repo.save({
      start: new Date(),
      end: null,
      userId,
    });
  }

  async end(userId: number): Promise<Timelog> {
    const timelog = await this.repo
      .createQueryBuilder('timelog')
      .where('timelog.userId = :userId', { userId })
      .andWhere('timelog.end IS NULL')
      .getOne();

    if (!timelog) {
      throw new NotFoundException('Active timelog not found');
    }

    const endDate = new Date();

    await this.repo
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
