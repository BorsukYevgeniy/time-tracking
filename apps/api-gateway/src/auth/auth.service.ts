import { CreateUserDto, User } from '@contracts/users';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(user: User): Promise<string> {
    return await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
    });
  }

  async register(dto: CreateUserDto): Promise<string> {
    const user: User | null = await firstValueFrom(
      this.userService.getUserByEmail(dto.email),
    );

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(dto.password, 6);

    const newUser: User = await firstValueFrom(
      this.userService.create({ ...dto, password: hashedPassword }),
    );

    return await this.generateToken(newUser);
  }

  async login(dto: LoginDto): Promise<string> {
    const user: User | null = await firstValueFrom(
      this.userService.getUserByEmail(dto.email),
    );

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return await this.generateToken(user);
  }
}
