import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }
  @Post(':id/progress')
  progress(@Param('id') id: string) {
    return this.service.progress(id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}
