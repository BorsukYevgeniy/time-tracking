import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '../../config/config.service';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(ApiGatewayModule);
  const configService = appContext.get(ConfigService);

  const apiGatewayConfig = configService.API_GATEWAY_CONFIG;

  appContext.close();

  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(apiGatewayConfig);
}
bootstrap();
