import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@shared/config';
import { TimelogModule } from '../timelog/timelog.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.JWT_CONFIG,
    }),
    TimelogModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
