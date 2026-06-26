export type OrderStatus = "Awaiting Quote" | "Confirmed" | "Pending" | "In Production" | "Completed" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Partially Paid";

export interface ProductionStage {
  label: string;
  completed: boolean;
}

export interface Order {
  id: string;
  clientName: string;
  product: string;
  quantity: number;
  country: string;
  paymentStatus: PaymentStatus;
  productionStatus: string;
  status: OrderStatus;
  orderDate: string;
  amount: number;
  fabricDetails: string;
  printingDetails: string;
  techPackFile: string;
  clientPhone: string;
  billingEmail: string;
  address: string;
  shippingMethod: string;
  estimatedDelivery: string;
  paymentMethod: string;
  productionTimeline: ProductionStage[];
  shipmentReceipt?: string;
}

export interface OrderDocument extends Omit<Order, "id"> {
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}
