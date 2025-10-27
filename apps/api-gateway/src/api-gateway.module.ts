import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimelogModule } from './timelog/timelog.module';
import { ReportModule } from './report/report.module';

@Module({
  imports:[
    ReportModule,
    UsersModule,
    TimelogModule,
    AuthModule,
  ],
})
export class ApiGatewayModule {}
