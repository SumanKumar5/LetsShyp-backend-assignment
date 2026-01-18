import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CouriersModule } from '../couriers/couriers.module';
import { LocksModule } from '../locks/locks.module';

@Module({
  imports: [CouriersModule, LocksModule],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}