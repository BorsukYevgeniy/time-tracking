import { Inject, Injectable } from '@nestjs/common';

import {
  CreateUserDto,
  User,
  USER_CLIENT,
  USER_PATTERNS,
} from '@contracts/users';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_CLIENT) private readonly usersClient: ClientProxy) {}

  create(dto: CreateUserDto) {
    return this.usersClient
      .send<User, CreateUserDto>(USER_PATTERNS.CREATE, dto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getUserByEmail(email: string) {
    return this.usersClient.send<User, string>(
      USER_PATTERNS.FIND_BY_EMAIL,
      email,
    );
  }

  delete(id: number) {
    return this.usersClient
      .send(USER_PATTERNS.DELETE, id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
