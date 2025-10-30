import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto, USER_PATTERNS } from '@contracts/users';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.FIND_ALL)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @MessagePattern(USER_PATTERNS.FIND_BY_EMAIL)
  async findByEmail(@Payload() email: string): Promise<User | null> {
    return await this.usersService.findByEmail(email);
  }

  @MessagePattern(USER_PATTERNS.CREATE)
  async create(@Payload() dto: CreateUserDto): Promise<User> {
    return await this.usersService.create(dto);
  }

  @MessagePattern(USER_PATTERNS.DELETE)
  async delete(@Payload(ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
