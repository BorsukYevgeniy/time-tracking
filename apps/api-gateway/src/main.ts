import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@shared/config';
import * as cookieParser from 'cookie-parser';
import { ApiGatewayModule } from './api-gateway.module';
import { RpcExceptionFilter } from './common/filter/rpc.exception-filter';

async function bootstrap() {
  const configCtx = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configCtx.get(ConfigService);

  const apiGatewayPort = configService.API_GATEWAY_CONFIG;

  configCtx.close();

  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(apiGatewayPort, () =>
    console.log(`Gateway running in http://localhost:${apiGatewayPort}`),
  );
}
bootstrap();
