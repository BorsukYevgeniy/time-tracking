import { Module } from '@nestjs/common';
import { TimelogService } from './timelog.service';

@Module({
  providers: [TimelogService]
})
export class TimelogModule {}
