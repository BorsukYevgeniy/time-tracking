import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@shared/config';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(ApiGatewayModule);
  const configService = appContext.get(ConfigService);

  const apiGatewayConfig = configService.API_GATEWAY_CONFIG;

  console.log('API Gateway running on port:', apiGatewayConfig);

  appContext.close();

  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(apiGatewayConfig);
}
bootstrap();
