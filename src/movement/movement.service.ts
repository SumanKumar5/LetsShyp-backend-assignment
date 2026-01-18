import { Injectable } from '@nestjs/common';
import { OrdersStore } from '../orders/orders.store';
import { CouriersStore } from '../couriers/couriers.store';

@Injectable()
export class MovementService {
  constructor(
    private orders: OrdersStore,
    private couriers: CouriersStore,
  ) {}

  move() {
    const results: any[] = [];
    for (const courier of this.couriers.all()) {
      if (!courier.activeOrderId) continue;

      const order = this.orders.get(courier.activeOrderId);
      if (!order) continue;

      const target =
        order.state === 'ASSIGNED' || order.state === 'PICKED_UP'
          ? order.pickup
          : order.drop;

      if (courier.location.x !== target.x)
        courier.location.x += courier.location.x < target.x ? 1 : -1;
      else if (courier.location.y !== target.y)
        courier.location.y += courier.location.y < target.y ? 1 : -1;

      if (courier.location.x === target.x && courier.location.y === target.y) {
        if (order.state === 'ASSIGNED') order.state = 'PICKED_UP';
        else if (order.state === 'PICKED_UP') order.state = 'IN_TRANSIT';
        else if (order.state === 'IN_TRANSIT') {
          order.state = 'DELIVERED';
          courier.available = true;
          courier.activeOrderId = undefined;
        }

        this.orders.update(order);
        this.couriers.update(courier);
      }

      results.push({ courier, order });
    }

    return results;
  }
}