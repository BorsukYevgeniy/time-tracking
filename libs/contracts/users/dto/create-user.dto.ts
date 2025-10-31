import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => {
    return value.trim();
  })
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => {
    return value.trim();
  })
  @Length(6, 12)
  password: string;

  @IsString()
  @Transform(({ value }) => {
    return value.trim();
  })
  @Length(0, 20)
  username: string;
}
