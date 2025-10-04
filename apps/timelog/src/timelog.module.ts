import { Module } from '@nestjs/common';
import { TimelogController } from './timelog.controller';
import { TimelogService } from './timelog.service';
import { ConfigModule, ConfigService } from '@shared/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Timelog } from './timelog.entity';

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
  ],
  controllers: [TimelogController],
  providers: [TimelogService],
})
export class TimelogModule {}
