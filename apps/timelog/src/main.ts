import { NestFactory } from '@nestjs/core';
import { TimelogModule } from './timelog.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TimelogModule,
    { transport: Transport.TCP, options: { port: 3004 } },
  );
  await app.listen();
}
bootstrap();
