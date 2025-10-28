import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { ConfigModule, ConfigService } from '@shared/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService): TypeOrmModuleOptions => ({
        ...configService.USER_DB_CONFIG,
        entities: [User],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User])
    ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
})
export class UsersModule {}
