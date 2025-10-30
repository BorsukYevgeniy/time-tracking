import { Inject, Injectable } from '@nestjs/common';

import { USER_CLIENT } from '@contracts/users';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_CLIENT) private readonly usersClient: ClientProxy) {}

  async delete(id: number) {
    return this.usersClient.send<string>('users.delete', id);
  }
}
