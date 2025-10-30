import { CreateUserDto } from '@contracts/users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOneBy({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await this.repo.save(dto);
  }

  async delete(id: number) {
    return await this.repo.delete({ id });
  }
}
