import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class ValidateCreateOrderMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { businessId } = req.body;

    await this.getBusiness(businessId);

    next();
  }

  private async getBusiness(businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      throw new NotFoundException('business not found');
    }

    return business;
  }
}
