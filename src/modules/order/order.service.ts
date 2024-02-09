import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepo: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepo.create(createOrderDto);
  }
}
