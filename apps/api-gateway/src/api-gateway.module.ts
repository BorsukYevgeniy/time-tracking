import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TimelogModule } from './timelog/timelog.module';
import { ReportModule } from './report/report.module';
import { ConfigModule, ConfigService } from '@shared/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TimelogModule,
    ReportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.JWT_CONFIG,
        global: true,
      }),
    }),
  ],
})
export class ApiGatewayModule {}
