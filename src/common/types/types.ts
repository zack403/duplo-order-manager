import { ApiProperty } from '@nestjs/swagger';

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
export class CreateOrderResponseDetail {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  businessId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  date: Date;
}

export class CreateOrderResponse {
  @ApiProperty({ default: 201 })
  statusCode: number;
  @ApiProperty()
  data: CreateOrderResponseDetail;
  @ApiProperty()
  path: string;
}
