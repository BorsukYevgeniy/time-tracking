import { Module } from '@nestjs/common';
import { TimelogService } from './timelog.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { TIMELOG_CLIENT } from './constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: TIMELOG_CLIENT,
        useFactory: async (configService: ConfigService) =>
          configService.TIMELOG_CONFIG,
      },
    ]),
  ],
  providers: [TimelogService],
})
export class TimelogModule {}
