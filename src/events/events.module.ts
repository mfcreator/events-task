import { Module } from '@nestjs/common';
import { EventsMockController } from './controllers/impl/events-mock.controller';
import { EventsMockService } from './services/impl/events-mock.service';
import { EventsMockData } from './mock-data/event';

@Module({
  controllers: [EventsMockController],
  providers: [EventsMockService, { provide: 'EVENTS_DATA', useValue: EventsMockData }],
})
export class EventsModule {}
