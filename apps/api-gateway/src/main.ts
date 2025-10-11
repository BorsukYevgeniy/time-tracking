import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigModule, ConfigService } from '@shared/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configCtx.get(ConfigService);

  const apiGatewayPort = configService.API_GATEWAY_CONFIG;

  configCtx.close();

  const app = await NestFactory.create(ApiGatewayModule);
  app.use(cookieParser());

  await app.listen(apiGatewayPort, () =>
    console.log(`Gateway running in http://localhost:${apiGatewayPort}`),
  );
}
bootstrap();
