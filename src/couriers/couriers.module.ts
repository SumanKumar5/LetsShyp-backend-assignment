import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller';
import { CouriersStore } from './couriers.store';

@Module({
  controllers: [CouriersController],
  providers: [CouriersService, CouriersStore],
  exports: [CouriersStore],
})
export class CouriersModule {}