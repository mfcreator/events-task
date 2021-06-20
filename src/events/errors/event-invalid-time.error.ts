import { HttpException, HttpStatus } from '@nestjs/common';

export class EventInvalidTimeError extends HttpException {
  constructor() {
    super('Cannot create event. Event start time is greater than event end time', HttpStatus.BAD_REQUEST);
  }
}
