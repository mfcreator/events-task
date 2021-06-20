import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Event } from '../../models/event';
import { EventsController } from '../events.controller';
import { EventsMockService } from '../../services/impl/events-mock.service';
import { createEvent } from '../../dtos/create-event.dto';
import { getEvents } from '../../dtos/get-events.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsMockController implements EventsController {
  constructor(private eventsService: EventsMockService) {}

  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({ status: 409, description: 'Events overlap confilct' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'Event created' })
  @Post()
  async createEvent(@Body() event: createEvent): Promise<Event> {
    const { dateFrom, dateTo, title } = event;
    return this.eventsService.createEvent(dateFrom, dateTo, title);
  }

  @ApiOperation({ summary: 'Get event by id' })
  @ApiResponse({ status: 200, description: 'The found record' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }

  @ApiOperation({ summary: 'Get events by time period' })
  @ApiResponse({ status: 200, description: 'The found records' })
  @Get()
  async getEvents(@Query() searchParams: getEvents): Promise<{ totalCount: number; events: Event[] }> {
    const { dateFrom, dateTo, offset, limit } = searchParams;
    return this.eventsService.getEvents(dateFrom, dateTo, offset, limit);
  }

  @ApiOperation({ summary: 'Remove event by id' })
  @ApiResponse({ status: 204, description: 'Record removed' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @HttpCode(204)
  @Delete(':id')
  async removeEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.removeEvent(id);
  }
}
