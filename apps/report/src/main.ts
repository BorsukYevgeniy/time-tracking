import { NestFactory } from '@nestjs/core';
import { ReportModule } from './report.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReportModule,
    { transport: Transport.TCP, options: { port: 3003 } },
  );
  await app.listen();
}
bootstrap();
