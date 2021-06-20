import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Event } from '../../models/event';
import { EventsController } from '../events.controller';
import { EventsMockService } from '../../services/impl/events-mock.service';

@Controller('events')
export class EventsMockController implements EventsController {
  constructor(private eventsService: EventsMockService) {}

  @Post()
  async createEvent(
    @Body('dateFrom') dateFrom: string,
    @Body('dateTo') dateTo: string,
    @Body('title') title: string,
  ): Promise<Event> {
    return this.eventsService.createEvent(dateFrom, dateTo, title);
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }

  @Get()
  async getEvents(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    return this.eventsService.getEvents(dateFrom, dateTo, offset, limit);
  }

  @HttpCode(204)
  @Delete(':id')
  async removeEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.removeEvent(id);
  }
}
