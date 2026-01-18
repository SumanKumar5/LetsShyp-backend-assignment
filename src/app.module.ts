import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { CouriersModule } from './couriers/couriers.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MovementModule } from './movement/movement.module';
import { LocksModule } from './locks/locks.module';

@Module({
  imports: [
    OrdersModule,
    CouriersModule,
    AssignmentModule,
    MovementModule,
    LocksModule,
  ],
})
export class AppModule {}