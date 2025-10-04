import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ConfigModule } from '@shared/config';

@Module({
  imports: [ConfigModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
