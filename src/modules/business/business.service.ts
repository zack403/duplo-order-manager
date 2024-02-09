import { Injectable } from '@nestjs/common';
import { BusinessRepository } from './business.repository';
import { Business } from '@prisma/client';

@Injectable()
export class BusinessService {
  constructor(private busRepo: BusinessRepository) {}

  async findAll(): Promise<Business[]> {
    return await this.busRepo.findAll();
  }

  async getCreditScore(businessId: string): Promise<number> {
    return await this.busRepo.getCreditScore(businessId);
  }
}
