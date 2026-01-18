import { Injectable } from '@nestjs/common';
import { CouriersStore } from '../couriers/couriers.store';
import { manhattan } from './distance.util';
import { MutexService } from '../locks/mutex.service';

const EXPRESS_THRESHOLD = 5;

@Injectable()
export class AssignmentService {
  constructor(
    private couriers: CouriersStore,
    private mutex: MutexService,
  ) {}

  async assign(pickup: { x: number; y: number }, type: 'EXPRESS' | 'NORMAL') {
    await this.mutex.lock('ASSIGNMENT');

    try {
      const eligible = this.couriers
        .all()
        .filter(c => c.available)
        .map(c => ({ courier: c, dist: manhattan(c.location, pickup) }));

      if (!eligible.length) {
        return { courier: null, reason: 'No available couriers' };
      }

      const sorted = eligible.sort((a, b) => a.dist - b.dist);

      if (type === 'EXPRESS' && sorted[0].dist > EXPRESS_THRESHOLD) {
        return { courier: null, reason: 'No courier within express distance' };
      }

      const chosen = sorted[0].courier;
      chosen.available = false;
      this.couriers.update(chosen);

      return { courier: chosen, reason: null };
    } finally {
      this.mutex.unlock('ASSIGNMENT');
    }
  }
}