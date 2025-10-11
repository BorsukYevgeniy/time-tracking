import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_CLIENT } from '../users/constants';
import { firstValueFrom } from 'rxjs';

import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto, User, USER_PATTERNS } from '@contracts/users';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(user: User): Promise<string> {
    return await this.jwtService.signAsync({
      id: user.id,
    });
  }

  async register(dto: CreateUserDto): Promise<string> {
    const user: User | null = await firstValueFrom(
      this.userClient.send(
        USER_PATTERNS.FIND_BY_EMAIL,
        dto.email,
      ),
    );

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(dto.password, 6);

    const newUser: User = await firstValueFrom(
      this.userClient.send(USER_PATTERNS.CREATE, {
        ...dto,
        password: hashedPassword,
      }),
    );

    return await this.generateToken(newUser);
  }

  async login(dto: LoginDto): Promise<string> {
    const user: User | null = await firstValueFrom(
      this.userClient.send(USER_PATTERNS.FIND_BY_EMAIL, dto.email),
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
