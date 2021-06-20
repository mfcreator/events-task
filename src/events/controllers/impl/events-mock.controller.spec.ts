import { Test, TestingModule } from '@nestjs/testing';
import { EventsMockController } from './events-mock.controller';
import { EventsController } from '../events.controller';
import { EventsMockService } from '../../services/impl/events-mock.service';
import { EventsService } from '../../services/events.service';
import { EventsMockData } from '../../mock-data/event';

describe('EventsController', () => {
  let controller: EventsController;
  let eventService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsMockController],
      providers: [EventsMockService, { provide: 'EVENTS_DATA', useValue: EventsMockData }],
    }).compile();

    controller = module.get<EventsMockController>(EventsMockController);
    eventService = module.get<EventsMockService>(EventsMockService);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createEvent()', () => {
    expect(controller.createEvent).toBeDefined();
    expect(typeof controller.createEvent).toBe('function');
  });

  it('getEvent()', () => {
    expect(controller.getEvent).toBeDefined();
    expect(typeof controller.getEvent).toBe('function');
  });

  it('getEvents()', () => {
    expect(controller.getEvents).toBeDefined();
    expect(typeof controller.getEvents).toBe('function');
  });

  it('removeEvent()', () => {
    expect(controller.removeEvent).toBeDefined();
    expect(typeof controller.removeEvent).toBe('function');
  });
});
