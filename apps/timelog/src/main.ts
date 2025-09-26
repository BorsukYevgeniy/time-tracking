import { NestFactory } from '@nestjs/core';
import { TimelogModule } from './timelog.module';

async function bootstrap() {
  const app = await NestFactory.create(TimelogModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
