import { CreateUserDto } from '@contracts/users';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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
    try {
      return await this.usersRepository.create(dto);
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async delete(id: number) {
    const deleteRes = await this.usersRepository.delete(id);

    if (!deleteRes.affected) throw new RpcException(new NotFoundException());
  }
}
