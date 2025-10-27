import { Module } from '@nestjs/common';
import { TimelogService } from './timelog.service';
import { ClientsModule } from '@nestjs/microservices';
import { TIMELOG_CLIENT } from '@contracts/timelog';
import { ConfigService, ConfigModule } from '@shared/config';
import { TimelogController } from './timelog.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.JWT_CONFIG,
      }),
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
})
export class TimelogModule {}
