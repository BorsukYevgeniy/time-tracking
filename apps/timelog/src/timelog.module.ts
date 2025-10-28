import { Module } from '@nestjs/common';
import { TimelogController } from './timelog.controller';
import { TimelogService } from './timelog.service';
import { ConfigModule, ConfigService } from '@shared/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Timelog } from './timelog.entity';
import { TimelogRepository } from './timelog.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { TimelogScheduler } from './timelog.scheduler';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService): TypeOrmModuleOptions => ({
        ...configService.TIMELOG_DB_CONFIG,
        entities: [Timelog],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Timelog]),
    ScheduleModule.forRoot()
  ],
  controllers: [TimelogController],
  providers: [TimelogScheduler, TimelogService, TimelogRepository],
})
export class TimelogModule {}
