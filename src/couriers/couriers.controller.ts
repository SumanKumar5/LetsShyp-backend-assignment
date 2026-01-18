import { Controller, Get, Post, Param } from '@nestjs/common';
import { CouriersService } from './couriers.service';

@Controller('couriers')
export class CouriersController {
  constructor(private service: CouriersService) {}

  @Post('seed')
  seed() {
    return this.service.seed();
  }

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }
}