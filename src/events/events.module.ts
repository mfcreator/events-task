import { Module } from '@nestjs/common';
import { EventsMockController } from './controllers/impl/events-mock.controller';
import { EventsMockService } from './services/impl/events-mock.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EventsMockController],
  providers: [EventsMockService, PrismaService],
})
export class EventsModule {}
