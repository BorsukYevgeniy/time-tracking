import {
  SearchTimelogsDto,
  Timelog,
  TIMELOG_CLIENT,
  TIMELOG_PATTERNS,
} from '@contracts/timelog';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TimelogService {
  @Inject(TIMELOG_CLIENT) private readonly timelogClient: ClientProxy;

  start(userId: number): Observable<Timelog> {
    return this.timelogClient
      .send<Timelog, number>(TIMELOG_PATTERNS.START, userId)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  end(userId: number): Observable<Timelog> {
    return this.timelogClient
      .send<Timelog, number>(TIMELOG_PATTERNS.END, userId)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getById(id: number): Observable<Timelog> {
    return this.timelogClient
      .send<Timelog, number>(TIMELOG_PATTERNS.GET_BY_ID, id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
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

  searchLogs(dto: SearchTimelogsDto) {
    return this.timelogClient.send<Timelog[], SearchTimelogsDto>(
      TIMELOG_PATTERNS.SEARCH_LOGS,
      dto,
    );
  }
}
