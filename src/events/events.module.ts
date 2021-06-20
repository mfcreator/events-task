import { Module } from '@nestjs/common';
import { EventsMockController } from './controllers/impl/events-mock.controller';

@Module({
  controllers: [EventsMockController],
})
export class EventsModule {}
