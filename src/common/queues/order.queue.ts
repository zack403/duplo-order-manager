import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOrderDto } from '../../modules/order/dto/create-order.dto';

@Injectable()
export class OrderQueue {
  constructor(@InjectQueue('orders') private readonly ordersQueue: Queue) {}

  async addOrderToQueue(orderData: CreateOrderDto): Promise<void> {
    await this.ordersQueue.add(orderData);
  }
}
