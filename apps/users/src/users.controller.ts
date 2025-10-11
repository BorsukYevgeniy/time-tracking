import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, USER_PATTERNS } from '@contracts/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.FIND_BY_EMAIL)
  async findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern(USER_PATTERNS.CREATE)
  async createUser(@Payload() dto: CreateUserDto)  {
    return this.usersService.create(dto);
  }
}
