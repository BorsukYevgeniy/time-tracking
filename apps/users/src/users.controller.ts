import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@shared/users/dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findByEmail')
  async findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern('users.create')
  async createUser(@Payload() dto: CreateUserDto)  {
    return this.usersService.create(dto);
  }
}
