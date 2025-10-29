import { Timelog, TIMELOG_CLIENT, TIMELOG_PATTERNS } from '@contracts/timelog';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class TimelogService {
  @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy;

  start(userId: number): Observable<Timelog> {
    return this.timelogClient.send<Timelog, number>(
      TIMELOG_PATTERNS.START,
      userId,
    );
  }

  end(userId: number): Observable<Timelog> {
    return this.timelogClient.send<Timelog, number>(
      TIMELOG_PATTERNS.END,
      userId,
    );
  }

  getById(id: number): Observable<Timelog> {
    return this.timelogClient.send<Timelog, number>(
      TIMELOG_PATTERNS.GET_BY_ID,
      id,
    );
  }

  getLogsByUserId(userId: number): Observable<Timelog[]> {
    return this.timelogClient.send<Timelog[], number>(
      TIMELOG_PATTERNS.GET_LOGS_BY_USER_ID,
      userId,
    );
  }

  getAllLogs() {
    return this.timelogClient.send<Timelog[]>(TIMELOG_PATTERNS.GET_ALL, {});
  }
}
