import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsISO8601 } from 'class-validator';

export class createEvent {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({ example: '2020-01-01T15:00:00.000Z', description: 'ISO8601 date string' })
  @IsISO8601({ strict: true })
  dateFrom: string;

  @ApiProperty({ example: '2020-01-01T15:00:00.000Z', description: 'ISO8601 date string' })
  @IsISO8601({ strict: true })
  dateTo: string;
}
