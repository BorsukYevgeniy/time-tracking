import { CreateUserDto } from '@contracts/users';
import { OmitType } from '@nestjs/mapped-types';

export class LoginDto extends OmitType(CreateUserDto, ['username']) {}
