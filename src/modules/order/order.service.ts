import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { Order } from '@prisma/client';
import { OrderRepository } from './order.repository';
import { OrderQueue } from '../../common/queues/order.queue';
import * as axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private readonly orderQueue: OrderQueue,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    this.orderQueue.addOrderToQueue(createOrderDto);
    // return await this.orderRepo.create(createOrderDto);
  }

  async getOrdersDetailsForBusiness(businessId: string) {
    return await this.orderRepo.getOrdersDetailsForBusiness(businessId);
  }

  async logTax(taxData: any, retryCount: number = 3): Promise<void> {
    try {
      await axios.default.post(
        'https://taxes.free.beeceptor.com/log-tax',
        taxData,
      );
      Logger.log('Tax logged successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && retryCount > 0) {
        console.error(
          `Error occurred while logging tax: ${error.message}. Retrying...`,
        );

        const delayMs = Math.pow(2, 3 - retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        await this.logTax(taxData, retryCount - 1);
      } else {
        Logger.error(
          `Failed to log tax after ${retryCount} retries: ${error.message}`,
        );
        throw error;
      }
    }
  }
}
