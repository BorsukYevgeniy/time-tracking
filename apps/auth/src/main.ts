import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '../../config/config.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);

  const authConfig = configService.AUTH_CONFIG;

  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    authConfig,
  );
  await app.listen();
}
bootstrap();
