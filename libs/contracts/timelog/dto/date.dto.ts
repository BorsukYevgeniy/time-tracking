import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class DateDto {
  @IsString()
  @Matches(/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
    message: 'Date must be in DD-MM-YYYY format',
  })
  @Transform(({ value }) => {
    const [day, month, year] = value.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 1);
  })
  startDate: Date;

  @IsString()
  @Matches(/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
    message: 'Date must be in DD-MM-YYYY format',
  })
  @Transform(({ value }) => {
    const [day, month, year] = value.split('-').map(Number);
    return new Date(year, month - 1, day, 23, 59, 59, 999);
  })
  endDate: Date;
}
