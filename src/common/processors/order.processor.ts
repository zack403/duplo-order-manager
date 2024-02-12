import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { OrderRepository } from '../../modules/order/order.repository';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderService } from 'src/modules/order/order.service';

@Processor('orders')
export class OrderProcessor {
  constructor(
    private orderRepo: OrderRepository,
    private orderSvc: OrderService,
  ) {}
  @Process()
  async handleOrder(job: any): Promise<void> {
    const result = await this.orderRepo.create(job.data);
    const taxData = {
      order_id: result.id,
      platform_code: '022',
      amount: result.amount,
    };
    await this.orderSvc.logTax(taxData);
  }

  @OnQueueActive()
  onActive(job: Job<unknown>) {
    // Log that job is starting
    Logger.log(`Starting job ${job.id} : ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<unknown>) {
    // Log job completion status
    Logger.log(`Job ${job.id} has been finished`);
  }
}
