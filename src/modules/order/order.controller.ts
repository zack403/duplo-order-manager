import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderResponse } from 'src/common/types/types';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creates a new order for a business' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 201,
    description: 'Order Successfully created',
    type: CreateOrderResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get business order details' })
  @ApiResponse({
    status: 200,
    description: 'Returns business order details',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('detail/:businessId')
  async getOrdersDetailsForBusiness(@Param('businessId') businessId: string) {
    return await this.orderService.getOrdersDetailsForBusiness(businessId);
  }
}
