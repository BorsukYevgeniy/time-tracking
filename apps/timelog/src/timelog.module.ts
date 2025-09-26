import { Module } from '@nestjs/common';
import { TimelogController } from './timelog.controller';
import { TimelogService } from './timelog.service';

@Module({
  imports: [],
  controllers: [TimelogController],
  providers: [TimelogService],
})
export class TimelogModule {}
