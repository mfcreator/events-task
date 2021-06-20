import { IsDateString, IsDefined, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class getEvents {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @IsDefined()
  @IsDateString()
  dateFrom: string;

  @IsDefined()
  @IsDateString()
  dateTo: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit = 10;
}
