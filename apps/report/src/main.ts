import { NestFactory } from '@nestjs/core';
import { ReportModule } from './report.module';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@shared/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ReportModule);
  const configService = appContext.get(ConfigService);

  const reportConfig = configService.REPORT_CONFIG;

  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReportModule,
    reportConfig,
  );
  await app.listen();
}
bootstrap();
