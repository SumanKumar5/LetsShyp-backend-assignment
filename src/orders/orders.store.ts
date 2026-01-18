import { Injectable } from '@nestjs/common';
import { Order } from './order.model';

@Injectable()
export class OrdersStore {
  private orders = new Map<string, Order>();

  create(order: Order) {
    this.orders.set(order.id, order);
    return order;
  }

  get(id: string) {
    return this.orders.get(id);
  }

  update(order: Order) {
    this.orders.set(order.id, order);
    return order;
  }

  all() {
    return Array.from(this.orders.values());
  }
}