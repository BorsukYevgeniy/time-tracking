import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { DateDto } from './date.dto';

export class SearchTimelogsDto extends DateDto {
  @IsInt()
  @IsPositive()
  @Transform(() => Number)
  userId: number;
}
