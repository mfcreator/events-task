import { IsDateString, IsDefined, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class getEvents {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset: number;

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
