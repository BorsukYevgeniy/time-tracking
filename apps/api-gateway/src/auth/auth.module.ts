import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_CLIENT } from './constants';
import { ConfigModule, ConfigService } from '@shared/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: AUTH_CLIENT,
        useFactory: async (configService: ConfigService) =>
          configService.AUTH_CONFIG,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
