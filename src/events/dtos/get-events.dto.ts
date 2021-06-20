import { IsDateString, IsDefined, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class getEvents {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @ApiProperty({ example: '2020-01-01T15:00:00.000Z', description: 'ISO8601 date string' })
  @IsDefined()
  @IsDateString()
  dateFrom: string;

  @ApiProperty({ example: '2020-01-01T15:00:00.000Z', description: 'ISO8601 date string' })
  @IsDefined()
  @IsDateString()
  dateTo: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit = 10;
}
