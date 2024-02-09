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

    const [orderDataWithoutDate, orderDataWithDate] = await Promise.all([
      this.prisma.order.aggregate({
        where: { businessId },
        _sum: { amount: true },
        _count: { id: true },
      }),
      this.prisma.order.aggregate({
        where: {
          businessId,
          date: {
            gte: startOfToday,
          },
        },
        _sum: { amount: true },
        _count: { id: true },
      }),
    ]);

    return {
      totalOrders: orderDataWithoutDate._count.id,
      totalAmount: orderDataWithoutDate._sum.amount,
      totalOrdersToday: orderDataWithDate._count.id,
      totalAmountToday: orderDataWithDate._sum.amount,
    };
  }
}
