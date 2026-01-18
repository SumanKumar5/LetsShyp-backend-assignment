import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersStore } from './orders.store';
import { AssignmentService } from '../assignment/assignment.service';
import { v4 as uuid } from 'uuid';
import { Order } from './order.model';
import { canTransition } from './order.state-machine';

@Injectable()
export class OrdersService {
  constructor(
    private store: OrdersStore,
    private assignment: AssignmentService,
  ) {}

  async create(dto: any) {
    const order: Order = {
      id: uuid(),
      pickup: dto.pickup,
      drop: dto.drop,
      type: dto.type,
      packageDetails: dto.packageDetails,
      state: 'CREATED',
    };

    const result = await this.assignment.assign(order.pickup, order.type);

    if (result.courier) {
      order.state = 'ASSIGNED';
      order.courierId = result.courier.id;
      result.courier.activeOrderId = order.id;
    }

    this.store.create(order);

    return {
      orderId: order.id,
      state: order.state,
      courierId: order.courierId ?? null,
      reason: result.reason,
    };
  }

  progress(id: string) {
    const order = this.store.get(id);
    if (!order) throw new NotFoundException('Order not found');

    const next: any = {
      CREATED: 'ASSIGNED',
      ASSIGNED: 'PICKED_UP',
      PICKED_UP: 'IN_TRANSIT',
      IN_TRANSIT: 'DELIVERED',
    }[order.state];

    if (!next || !canTransition(order.state, next)) {
      throw new BadRequestException('Invalid state transition');
    }

    order.state = next;
    this.store.update(order);
    return order;
  }

  cancel(id: string) {
    const order = this.store.get(id);
    if (!order) throw new NotFoundException('Order not found');

    if (order.state === 'DELIVERED') {
      throw new BadRequestException('Cannot cancel delivered order');
    }

    order.state = 'CANCELLED';
    this.store.update(order);
    return order;
  }
}