import { NestFactory } from '@nestjs/core';
import { TimelogModule } from './timelog.module';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '../../config/config.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(TimelogModule);
  const configService = appContext.get(ConfigService);

  const timelogConfig = configService.TIMELOG_CONFIG;

  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TimelogModule,
    timelogConfig,
  );
  await app.listen();
}
bootstrap();
