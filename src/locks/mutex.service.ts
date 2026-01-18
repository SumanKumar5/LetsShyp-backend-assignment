import { Injectable } from '@nestjs/common';

@Injectable()
export class MutexService {
  private locks = new Set<string>();

  async lock(key: string) {
    while (this.locks.has(key)) {
      await new Promise(r => setTimeout(r, 10));
    }
    this.locks.add(key);
  }

  unlock(key: string) {
    this.locks.delete(key);
  }
}