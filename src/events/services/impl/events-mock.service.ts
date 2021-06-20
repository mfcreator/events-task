import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { Inject, Injectable } from '@nestjs/common';

/* eslint-disable */
@Injectable()
export class EventsMockService implements EventsService {
  constructor(@Inject('EVENTS_DATA') private _events: Event[]) {}

  createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  getEvent(id: string): Promise<Event> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  removeEvent(id: string): Promise<void> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }
}
