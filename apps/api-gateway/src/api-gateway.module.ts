import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimelogModule } from './timelog/timelog.module';
import { TimeController } from './time/time.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [UsersModule, AuthModule, TimelogModule, ReportModule],
  controllers: [TimeController],
})
export class ApiGatewayModule {}
