import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Event } from '../../models/event';
import { EventsController } from '../events.controller';
import { EventsMockData } from '../../mock-data/event';
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
    console.log(dateFrom, dateTo, title);
    return EventsMockData[0]; // todo: implement method
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    console.log(id);
    return EventsMockData[0]; // todo: implement method
  }

  @Get()
  getEvents(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    console.log(dateFrom, dateTo, offset, limit);
    return Promise.resolve({
      totalCount: EventsMockData.length,
      events: EventsMockData,
    }); // todo: implement method
  }

  @HttpCode(204)
  @Delete(':id')
  async removeEvent(@Param('id') id: string): Promise<void> {
    console.log(id);
    // todo: implement method
  }
}
