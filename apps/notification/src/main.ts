import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';

import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule)
  const configService = configCtx.get(ConfigService);

  const notificationConfig = configService.NOTIFICATION_CONFIG;

  configCtx.close()

  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule, notificationConfig
    );

  await app.listen();
}
bootstrap();
