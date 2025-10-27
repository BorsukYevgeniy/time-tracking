import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TIMELOG_CLIENT } from '@contracts/timelog';
import { Timelog, TIMELOG_PATTERNS } from '@contracts/timelog';
import { Observable } from 'rxjs';

@Injectable()
export class TimelogService {
  @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy;

  start(userId: number): Observable<Timelog> {
    return this.timelogClient.send<Timelog>(TIMELOG_PATTERNS.START, userId);
  }

  end(userId: number): Observable<Timelog> {
    return this.timelogClient.send<Timelog, number>(
      TIMELOG_PATTERNS.END,
      userId,
    );
  }
}
