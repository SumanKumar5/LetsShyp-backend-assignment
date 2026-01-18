export interface Courier {
  id: string;
  name: string;
  location: { x: number; y: number };
  available: boolean;
  activeOrderId?: string;
}
