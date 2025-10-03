import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '../../config/config.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const configService = appContext.get(ConfigService);

  const userConfig = configService.USER_CONFIG;
  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    userConfig,
  );

  await app.listen();
}
bootstrap();
