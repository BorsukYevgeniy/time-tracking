import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { USER_CLIENT } from '@contracts/users';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@shared/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: USER_CLIENT,
        useFactory: (configService: ConfigService) => configService.USER_CONFIG,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.JWT_CONFIG,
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
