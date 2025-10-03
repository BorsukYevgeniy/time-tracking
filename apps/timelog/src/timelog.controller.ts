import { Controller, Get } from '@nestjs/common';
import { TimelogService } from './timelog.service';

@Controller()
export class TimelogController {
  constructor(private readonly timelogService: TimelogService) {}
}
