import { Test, TestingModule } from '@nestjs/testing';
import { EventsMockController } from './events-mock.controller';
import { EventsController } from '../events.controller';
import { EventsMockService } from '../../services/impl/events-mock.service';
import { EventsService } from '../../services/events.service';
import { EventsMockData } from '../../mock-data/event';
import { getEvents } from '../../dtos/get-events.dto';
import { createEvent } from '../../dtos/create-event.dto';
import { PrismaService } from '../../../prisma.service';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsMockController],
      providers: [EventsMockService, PrismaService],
    }).compile();

    controller = module.get<EventsMockController>(EventsMockController);
    eventsService = module.get<EventsMockService>(EventsMockService);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createEvent()', () => {
    expect(controller.createEvent).toBeDefined();
    expect(typeof controller.createEvent).toBe('function');

    const [responseEvent] = EventsMockData;
    jest.spyOn(eventsService, 'createEvent').mockImplementation(() => Promise.resolve(responseEvent));

    const newEvent: createEvent = {
      title: 'new event',
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
    };

    controller.createEvent(newEvent);
    expect(eventsService.createEvent).toHaveBeenCalled();
  });

  it('getEvent()', () => {
    expect(controller.getEvent).toBeDefined();
    expect(typeof controller.getEvent).toBe('function');

    const [responseEvent] = EventsMockData;
    jest.spyOn(eventsService, 'getEvent').mockImplementation(() => Promise.resolve(responseEvent));

    controller.getEvent(responseEvent.id);
    expect(eventsService.getEvent).toHaveBeenCalled();
  });

  it('getEvents()', () => {
    expect(controller.getEvents).toBeDefined();
    expect(typeof controller.getEvents).toBe('function');

    jest.spyOn(eventsService, 'getEvents').mockImplementation(() => Promise.resolve({ totalCount: 0, events: [] }));

    const searchParams: getEvents = {
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
      limit: 0,
      offset: 0,
    };
    controller.getEvents(searchParams);
    expect(eventsService.getEvents).toHaveBeenCalled();
  });

  it('removeEvent()', () => {
    expect(controller.removeEvent).toBeDefined();
    expect(typeof controller.removeEvent).toBe('function');

    jest.spyOn(eventsService, 'removeEvent').mockImplementation(() => Promise.resolve());

    const [responseEvent] = EventsMockData;

    controller.removeEvent(responseEvent.id);
    expect(eventsService.removeEvent).toHaveBeenCalled();
  });
});
