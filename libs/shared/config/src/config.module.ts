import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        'apps/auth/.env',
        'apps/users/.env',
        'apps/report/.env',
        'apps/timelog/.env',
        'apps/api-gateway/.env',
      ],
    },),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
