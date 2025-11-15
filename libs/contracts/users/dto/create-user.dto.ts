import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    title: 'Email',
    type: String,
    description: 'Email of user',
    example: 'example@gmail.com',
  })
  @Transform(({ value }) => {
    return value.trim();
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Password',
    type: String,
    description: 'Password of user',
    example: 'iopJKL09876',
  })
  @IsString()
  @Transform(({ value }) => {
    return value.trim();
  })
  @Length(6, 12)
  password: string;

  @ApiProperty({
    title: 'Username',
    type: String,
    description: 'Username of user',
    example: 'User228',
  })
  @IsString()
  @Transform(({ value }) => {
    return value.trim();
  })
  @Length(0, 20)
  username: string;
}
