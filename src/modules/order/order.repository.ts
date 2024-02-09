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

  async getOrdersDetailsForBusiness(businessId: string) {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const orderDataWithoutDate = await this.prisma.order.aggregate({
      where: {
        businessId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    const orderDataWithDate = await this.prisma.order.aggregate({
      where: {
        businessId,
        date: {
          gte: startOfToday,
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    const totalOrders = orderDataWithoutDate._count.id;
    const totalAmount = orderDataWithoutDate._sum.amount;
    const totalOrdersToday = orderDataWithDate._count.id;
    const totalAmountToday = orderDataWithDate._sum.amount;

    return {
      totalOrders,
      totalAmount,
      totalOrdersToday,
      totalAmountToday,
    };
  }
}
