import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersStore } from './orders.store';
import { AssignmentModule } from '../assignment/assignment.module';

@Module({
  imports: [AssignmentModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersStore],
  exports: [OrdersStore],
})
export class OrdersModule {}