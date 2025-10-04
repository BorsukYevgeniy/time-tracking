import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ClientsModule } from '@nestjs/microservices';
import { REPORT_CLIENT } from './constants';
import { ConfigModule, ConfigService } from '@shared/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: REPORT_CLIENT,
        useFactory: async (configService: ConfigService) =>
          configService.REPORT_CONFIG,
      },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
