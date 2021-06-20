import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Prisma } from '@prisma/client';
import { EventInvalidTimeError } from '../../errors/event-invalid-time.error';
import { EventsOverlapError } from '../../errors/events-overlap.error';

@Injectable()
export class EventsMockService implements EventsService {
  constructor(private prisma: PrismaService) {}
  async createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
    const newEventStartDate = new Date(dateFrom);
    const newEventEndDate = new Date(dateTo);

    if (newEventStartDate.getTime() > newEventEndDate.getTime()) {
      throw new EventInvalidTimeError();
    }

    const conflictingEventQuery: Prisma.EventWhereInput = {
      OR: [
        {
          startDate: newEventStartDate,
        },
        {
          AND: [
            {
              startDate: {
                lt: newEventStartDate,
              },
            },
            {
              endDate: {
                gt: newEventStartDate,
              },
            },
          ],
        },
        {
          startDate: {
            gt: newEventStartDate,
            lt: newEventEndDate,
          },
        },
      ],
    };

    const conflictingEvent = await this.prisma.event.findFirst({
      where: conflictingEventQuery,
    });

    if (conflictingEvent) {
      throw new EventsOverlapError();
    }

    const data: Prisma.EventCreateInput = {
      title,
      startDate: newEventStartDate.toISOString(),
      endDate: newEventEndDate.toISOString(),
    };

    const newEvent = await this.prisma.event.create({
      data,
    });

    return {
      id: newEvent.id,
      title: newEvent.title,
      startDate: newEvent.startDate.toISOString(),
      endDate: newEvent.endDate.toISOString(),
    };
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException();
    }

    const { title, startDate, endDate } = event;

    return {
      id,
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }

  async getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    const eventsDateFrom = new Date(dateFrom);
    const eventsDateTo = new Date(dateTo);
    const searchEventsQuery: Prisma.EventWhereInput = {
      OR: [
        {
          AND: [
            {
              startDate: {
                lte: eventsDateFrom,
              },
            },
            {
              endDate: {
                gt: eventsDateFrom,
              },
            },
          ],
        },
        {
          startDate: {
            gt: eventsDateFrom,
            lt: eventsDateTo,
          },
        },
      ],
    };

    const totalCount = await this.prisma.event.count({
      where: searchEventsQuery,
    });

    const data = await this.prisma.event.findMany({
      where: searchEventsQuery,
      skip: offset,
      take: limit,
    });

    return {
      totalCount,
      events: data.map((el) => ({
        id: el.id,
        title: el.title,
        startDate: el.startDate.toISOString(),
        endDate: el.endDate.toISOString(),
      })),
    };
  }

  async removeEvent(id: string): Promise<void> {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException();
    }

    await this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
