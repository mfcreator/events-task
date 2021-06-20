import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Event } from '../../models/event';
import { EventsController } from '../events.controller';
import { EventsMockService } from '../../services/impl/events-mock.service';
import { createEvent } from '../../dtos/create-event.dto';
import { getEvents } from '../../dtos/get-events.dto';

@Controller('events')
export class EventsMockController implements EventsController {
  constructor(private eventsService: EventsMockService) {}

  @Post()
  async createEvent(@Body() event: createEvent): Promise<Event> {
    const { title, dateFrom, dateTo } = event;
    return this.eventsService.createEvent(title, dateFrom, dateTo);
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }

  @Get()
  async getEvents(@Query() searchParams: getEvents): Promise<{ totalCount: number; events: Event[] }> {
    const { dateFrom, dateTo, limit, offset } = searchParams;
    console.log(limit);
    return this.eventsService.getEvents(dateFrom, dateTo, limit, offset);
  }

  @HttpCode(204)
  @Delete(':id')
  async removeEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.removeEvent(id);
  }
}
