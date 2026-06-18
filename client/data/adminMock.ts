import type { Stats, Order } from '../types/admin';

export const stats: Stats = {
  totalClients: 124,
  totalOrders: 542,
  ordersInProduction: 87,
  pendingQuotations: 14,
  pendingPayments: 9,
  monthlyRevenue: 45230,
  deliveredOrders: 421,
  inventoryAlerts: 6,
};

export const recentOrders: Order[] = [
  {
    id: 'ORD-1001',
    clientName: 'Acme Apparel Ltd',
    product: 'Printed T-Shirt',
    quantity: 1200,
    status: 'in_production',
    paymentStatus: 'paid',
    productionStatus: 'Stitching',
    date: '2026-05-20',
  },
  {
    id: 'ORD-1002',
    clientName: 'Global Sports',
    product: 'Team Hoodie',
    quantity: 400,
    status: 'confirmed',
    paymentStatus: 'pending',
    productionStatus: 'Fabric Sourcing',
    date: '2026-05-22',
  },
  {
    id: 'ORD-1003',
    clientName: 'Uniform Co',
    product: 'Work Jacket',
    quantity: 250,
    status: 'quality_check',
    paymentStatus: 'paid',
    productionStatus: 'Quality Check',
    date: '2026-05-18',
  },
];
