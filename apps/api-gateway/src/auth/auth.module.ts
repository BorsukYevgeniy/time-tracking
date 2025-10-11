import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';
import { JwtModule } from '@nestjs/jwt';
import { USER_CLIENT } from '../users/constants';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: USER_CLIENT,
        useFactory: (configService: ConfigService) => configService.USER_CONFIG,
      },
    ]),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
