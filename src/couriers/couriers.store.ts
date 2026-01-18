import { Injectable } from '@nestjs/common';
import { Courier } from './courier.model';

@Injectable()
export class CouriersStore {
  private couriers = new Map<string, Courier>();

  create(courier: Courier) {
    this.couriers.set(courier.id, courier);
    return courier;
  }

  get(id: string) {
    return this.couriers.get(id);
  }

  all() {
    return Array.from(this.couriers.values());
  }

  update(courier: Courier) {
    this.couriers.set(courier.id, courier);
    return courier;
  }
}