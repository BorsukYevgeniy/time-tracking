import { CreateUserDto } from '@contracts/users';
import { OmitType } from '@nestjs/swagger';

export class LoginDto extends OmitType(CreateUserDto, ['username']) {}
