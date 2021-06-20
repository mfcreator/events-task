import { EventsService } from '../events.service';
import { EventsMockService } from './events-mock.service';
import { EventsMockData } from '../../mock-data/event';
import { Test, TestingModule } from '@nestjs/testing';
import { Event } from '../../models/event';
import { v4 as uuidv4 } from 'uuid';
import { EventsOverlapError } from '../../errors/events-overlap.error';
import { EventInvalidTimeError } from '../../errors/event-invalid-time.error';
import { NotFoundException } from '@nestjs/common';

describe('EventsMockService', () => {
  let eventsService: EventsService;
  const events: Event[] = EventsMockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsMockService, { provide: 'EVENTS_DATA', useValue: EventsMockData }],
    }).compile();

    eventsService = module.get<EventsMockService>(EventsMockService);

    jest.spyOn(eventsService, 'createEvent').mockImplementation(async (dateFrom, dateTo, title) => {
      const newEventStartDateTime = new Date(dateFrom).getTime();
      const newEventEndDateTime = new Date(dateTo).getTime();

      if (newEventStartDateTime > newEventEndDateTime) {
        throw new EventInvalidTimeError();
      }

      const conflictingEvent = events.find((createdEvent) => {
        const createdEventStartDateTime = new Date(createdEvent.startDate).getTime();
        const createdEventEndDateTime = new Date(createdEvent.endDate).getTime();

        return (
          createdEventStartDateTime === newEventStartDateTime ||
          (createdEventStartDateTime < newEventStartDateTime && createdEventEndDateTime > newEventStartDateTime) ||
          (createdEventStartDateTime > newEventStartDateTime && createdEventStartDateTime < newEventEndDateTime)
        );
      });

      if (conflictingEvent) {
        throw new EventsOverlapError();
      }

      const newEvent: Event = {
        id: uuidv4(),
        title,
        startDate: dateFrom,
        endDate: dateTo,
      };

      events.push(newEvent);

      return newEvent;
    });

    jest
      .spyOn(eventsService, 'getEvent')
      .mockImplementation(async (id) => events.find((createdEvent) => createdEvent.id === id));

    jest.spyOn(eventsService, 'getEvents').mockImplementation(async (dateFrom, dateTo, offset, limit) => {
      const fromTime = new Date(dateFrom).getTime();
      const toTime = new Date(dateTo).getTime();
      const searchedEvents = events.filter((createdEvent) => {
        const createdEventStartDateTime = new Date(createdEvent.startDate).getTime();
        const createdEventEndDateTime = new Date(createdEvent.endDate).getTime();
        return (
          (createdEventStartDateTime <= fromTime && createdEventEndDateTime >= fromTime) ||
          (createdEventStartDateTime > fromTime && createdEventStartDateTime < toTime)
        );
      });

      return {
        totalCount: searchedEvents.length,
        events: searchedEvents.splice(offset, limit),
      };
    });

    jest.spyOn(eventsService, 'removeEvent').mockImplementation(async (id) => {
      const idx = events.findIndex((createdEvent) => createdEvent.id === id);

      if (idx === -1) {
        throw new NotFoundException();
      }

      events.splice(idx, 1);
    });
  });

  describe('createEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.createEvent).toBeDefined();
      expect(typeof eventsService.createEvent).toBe('function');
    });

    it('should create event when time period is not overlapping with already created events', async () => {
      const startDate = '2021-06-17T17:30:00.000Z';
      const endDate = '2021-06-17T18:00:00.000Z';
      const newEvent = await eventsService.createEvent(startDate, endDate, 'new Event');

      expect(newEvent && newEvent.title && newEvent.title === 'new Event').toBeTruthy();
    });

    it('should create event when start date is another event end date without conflicting with next event', async () => {
      const startDate = '2021-06-17T14:00:00.000Z';
      const endDate = '2021-06-17T15:00:00.000Z';
      const newEvent = await eventsService.createEvent(startDate, endDate, 'new Event');

      expect(newEvent && newEvent.title && newEvent.title === 'new Event').toBeTruthy();
    });

    it("shouldn't create event when dates are overlapping with already created events", async () => {
      const startDate = '2021-06-17T15:00:00.000Z';
      const endDate = '2021-06-17T17:00:00.000Z';

      expect(eventsService.createEvent(startDate, endDate, 'new Event')).rejects.toThrow(EventsOverlapError);
    });

    it("shouldn't create event when dates are overlapping with already created events", async () => {
      const startDate = '2021-06-17T17:00:00.000Z';
      const endDate = '2021-06-17T15:00:00.000Z';

      expect(eventsService.createEvent(startDate, endDate, 'new Event')).rejects.toThrow(EventInvalidTimeError);
    });
  });

  describe('getEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvent).toBeDefined();
      expect(typeof eventsService.getEvent).toBe('function');
    });

    it('should return event when id is found', async () => {
      const id = 'b4670aa6-6b0b-4a88-a326-e013906b7ab9';
      const event = await eventsService.getEvent(id);
      expect(event && event.id === id).toBeTruthy();
    });

    it('should return undefined when id is not found', async () => {
      const id = 'test';
      const event = await eventsService.getEvent(id);

      expect(event).toBeUndefined();
    });
  });

  describe('getEvents()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvents).toBeDefined();
      expect(typeof eventsService.getEvents).toBe('function');
    });

    it('should return total count and events based on search params', async () => {
      const dateFrom = '2021-07-27T10:00:00.000Z';
      const dateTo = '2021-07-30T22:00:00.000Z';
      const offset = 2;
      const limit = 20;
      const result = await eventsService.getEvents(dateFrom, dateTo, offset, limit);

      expect(result).toBeDefined();
      expect(typeof result.totalCount).toBe('number');
      expect(result.events.length).toBeLessThanOrEqual(limit);
    });
  });

  describe('removeEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.removeEvent).toBeDefined();
      expect(typeof eventsService.removeEvent).toBe('function');
    });

    it('should remove event when id is found', async () => {
      const id = 'ec53c26b-d7e1-423b-bd17-d92ca0a4cccf';
      await eventsService.removeEvent(id);

      expect(events.find((event) => event.id === id)).toBeUndefined();
    });

    it('should not remove event when id is not found', () => {
      const id = 'test';

      expect(eventsService.removeEvent(id)).rejects.toThrow(NotFoundException);
    });
  });
});
