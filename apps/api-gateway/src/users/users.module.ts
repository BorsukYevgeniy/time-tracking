import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ClientsModule } from '@nestjs/microservices';
import { USER_CLIENT } from './constants';
import { ConfigService, ConfigModule } from '@shared/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: USER_CLIENT,
        useFactory: async (configService: ConfigService) =>
          configService.USER_CONFIG,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
