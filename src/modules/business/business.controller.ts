import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { Business } from '@prisma/client';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly busSvc: BusinessService) {}

  @ApiOperation({ summary: 'Get all duplo businesses' })
  @ApiResponse({
    status: 200,
    description: 'Businesses Successfully fetched',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get()
  async findAll(): Promise<Business[]> {
    return await this.busSvc.findAll();
  }

  @ApiOperation({ summary: 'Get a business credit score' })
  @ApiResponse({
    status: 200,
    description: 'Returns a business credit score',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('credit-score/:businessId')
  async getCreditScore(
    @Param('businessId') businessId: string,
  ): Promise<number> {
    return await this.busSvc.getCreditScore(businessId);
  }
}
