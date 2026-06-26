export interface Stats {
  totalClients: number;
  totalOrders: number;
  ordersInProduction: number;
  pendingQuotations: number;
  pendingPayments: number;
  monthlyRevenue: number;
  deliveredOrders: number;
   inventoryAlerts: number;
}

export type OrderStatus =
  | 'draft'
  | 'confirmed'
  | 'in_production'
  | 'quality_check'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  clientName: string;
  product: string;
  quantity: number;
  status: OrderStatus;
  paymentStatus: 'paid' | 'pending' | 'failed';
  productionStatus: string;
  date: string;
}
