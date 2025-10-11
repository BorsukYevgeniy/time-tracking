import { NestFactory } from '@nestjs/core';
import { ReportModule } from './report.module';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigModule,ConfigService } from '@shared/config';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configCtx.get(ConfigService);

  const reportConfig = configService.REPORT_CONFIG;

  configCtx.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReportModule,
    reportConfig,
  );
  await app.listen();
}
bootstrap();
