import { Controller, Post } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('simulate')
export class MovementController {
  constructor(private service: MovementService) {}

  @Post('move')
  move() {
    return this.service.move();
  }
}