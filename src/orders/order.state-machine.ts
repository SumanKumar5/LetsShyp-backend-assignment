import { OrderState } from './order.model';

const transitions: Record<OrderState, OrderState[]> = {
  CREATED: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['PICKED_UP', 'CANCELLED'],
  PICKED_UP: ['IN_TRANSIT'],
  IN_TRANSIT: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

export function canTransition(from: OrderState, to: OrderState) {
  return transitions[from].includes(to);
}