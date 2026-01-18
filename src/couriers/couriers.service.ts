import { Injectable } from '@nestjs/common';
import { CouriersStore } from './couriers.store';
import { Courier } from './courier.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CouriersService {
  constructor(private store: CouriersStore) {}

  seed() {
    const couriers: Courier[] = [
      { id: uuid(), name: 'Ravi', location: { x: 1, y: 1 }, available: true },
      { id: uuid(), name: 'Aman', location: { x: 5, y: 2 }, available: true },
      { id: uuid(), name: 'Neha', location: { x: 8, y: 9 }, available: true },
      { id: uuid(), name: 'Pooja', location: { x: 3, y: 7 }, available: true },
    ];

    couriers.forEach(c => this.store.create(c));
    return couriers;
  }

  list() {
    return this.store.all();
  }

  get(id: string) {
    return this.store.get(id);
  }
}