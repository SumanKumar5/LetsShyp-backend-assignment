import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { OrdersModule } from '../orders/orders.module';
import { CouriersModule } from '../couriers/couriers.module';

@Module({
  imports: [OrdersModule, CouriersModule],
  providers: [MovementService],
  controllers: [MovementController],
})
export class MovementModule {}
