import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '../../common/utils/enum';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { businessId, amount } = createOrderDto;
    const newOrder = await this.prisma.order.create({
      data: {
        businessId,
        amount,
        status: OrderStatus.PENDING,
      },
    });
    return newOrder;
  }
}
