import { Injectable, Inject } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { USER_CLIENT } from './constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_CLIENT) private readonly usersClient: ClientProxy) {}

  async getHello() {
    return this.usersClient.send<string>('users.create', {});
  }
}
