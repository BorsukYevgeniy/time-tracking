import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TIMELOG_CLIENT } from './constants';
import { firstValueFrom } from 'rxjs';
import { Timelog } from '@contracts/timelog';

@Injectable()
export class TimelogService {
  @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy;

  async start(userId: number): Promise<Timelog> {
    return firstValueFrom(
      this.timelogClient.send<Timelog>('timelog.start', userId),
    );
  }
  async end(userId: number): Promise<Timelog> {
    return firstValueFrom<Timelog>(
      this.timelogClient.send('timelog.end', userId),
    );
  }
}
