import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configCtx.get(ConfigService);

  const userConfig = configService.USER_CONFIG;
  configCtx.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    userConfig,
  );

  await app.listen();
}
bootstrap();
