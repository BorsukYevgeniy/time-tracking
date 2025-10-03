import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimelogModule } from './timelog/timelog.module';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, TimelogModule, ReportModule, ConfigModule],
})
export class ApiGatewayModule {}
