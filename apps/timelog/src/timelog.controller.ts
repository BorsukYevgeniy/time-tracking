import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload} from '@nestjs/microservices'
import { TimelogService } from './timelog.service';

@Controller()
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}

  @MessagePattern('timelog.start')
  async start(@Payload(ParseIntPipe) userId:number) {
    return await this.timelogService.start(userId)
  }
  
  @MessagePattern('timelog.end')
  async end(@Payload(ParseIntPipe) userId:number) {
    return await this.timelogService.end(userId)
  }

}
