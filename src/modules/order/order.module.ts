import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderProcessor } from 'src/common/processors/order.processor';
import { BullModule } from '@nestjs/bull';
import { OrderQueue } from 'src/common/queues/order.queue';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService, OrderQueue, OrderProcessor],
  exports: [OrderService, OrderProcessor],
})
export class OrderModule {}
