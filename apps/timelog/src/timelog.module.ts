import { Module } from '@nestjs/common';
import { TimelogController } from './timelog.controller';
import { TimelogService } from './timelog.service';
import { ConfigModule } from '@shared/config';

@Module({
  imports: [ConfigModule],
  controllers: [TimelogController],
  providers: [TimelogService],
})
export class TimelogModule {}
