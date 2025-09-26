import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelogService {
  getHello(): string {
    return 'Hello World!';
  }
}
