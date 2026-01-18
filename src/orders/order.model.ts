export type OrderState =
  | 'CREATED'
  | 'ASSIGNED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: string;
  pickup: { x: number; y: number };
  drop: { x: number; y: number };
  type: 'EXPRESS' | 'NORMAL';
  packageDetails: string;
  state: OrderState;
  courierId?: string;
}