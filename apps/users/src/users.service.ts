import { CreateUserDto } from '@contracts/users';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(dto);
  }

  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }
}
