import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@shared/config';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
