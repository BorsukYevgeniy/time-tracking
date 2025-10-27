import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { validationSchema } from './validation.schema';


@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        'apps/users/.env',
        'apps/notification/.env',
        'apps/timelog/.env',
        'apps/api-gateway/.env',
      ],
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
