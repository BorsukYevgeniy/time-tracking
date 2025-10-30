import { TIMELOG_CLIENT } from '@contracts/timelog';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';
import { TimelogController } from './timelog.controller';
import { TimelogService } from './timelog.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.JWT_CONFIG,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: TIMELOG_CLIENT,
        useFactory: (configService: ConfigService) =>
          configService.TIMELOG_CONFIG,
      },
    ]),
  ],
  controllers: [TimelogController],
  providers: [TimelogService],
  exports: [TimelogService],
})
export class TimelogModule {}
