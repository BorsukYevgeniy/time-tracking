import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }
  
  async save(){
    const user = this.usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    });
    return await this.usersRepository.save(user);
  }
}
