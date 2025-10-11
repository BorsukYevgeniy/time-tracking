import { NestFactory } from '@nestjs/core';
import { TimelogModule } from './timelog.module';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configCtx.get(ConfigService);

  const timelogConfig = configService.TIMELOG_CONFIG;

  configCtx.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TimelogModule,
    timelogConfig,
  );
  await app.listen();
}
bootstrap();
