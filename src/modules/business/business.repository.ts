import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Business } from '@prisma/client';

@Injectable()
export class BusinessRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Business[]> {
    return await this.prisma.business.findMany();
  }

  async getCreditScore(businessId: string): Promise<number> {
    const creditData = await this.prisma.order.aggregate({
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

    const totalAmount = creditData._sum.amount;
    const totalTransactions = creditData._count.id;

    const creditScore = totalAmount / (totalTransactions * 100);
    return creditScore;
  }
}
