import { Event } from '../models/event';
import { createEvent } from '../dtos/create-event.dto';
import { getEvents } from '../dtos/get-events.dto';

export interface EventsController {
  /**
   * Gets event from the mock-data source by the identifier
   */
  getEvent(id: string): Promise<Event>;

  /**
   * Gets events from given period including pagination by offset and limit
   */
  getEvents(searchParams: getEvents): Promise<{ totalCount: number; events: Event[] }>;

  /**
   * Creates event for given period
   */
  createEvent(event: createEvent): Promise<Event>;

  /**
   * Removes event from the mock-data source by the identifier
   */
  removeEvent(id: string): Promise<void>;
}
