import { HttpException, HttpStatus } from '@nestjs/common';

export class EventsOverlapError extends HttpException {
  constructor() {
    super('Cannot create event. Event time conflitcs with already created event.', HttpStatus.CONFLICT);
  }
}
