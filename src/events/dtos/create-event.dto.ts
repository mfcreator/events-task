import { IsString, IsDefined, IsISO8601 } from 'class-validator';

export class createEvent {
  @IsDefined()
  @IsString()
  title: string;

  @IsISO8601({ strict: true })
  dateFrom: string;

  @IsISO8601({ strict: true })
  dateTo: string;
}
