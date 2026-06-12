export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: string;
}

export interface OrderItem {
  id: string;
  product: string;
  quantity: number;
  status: string;
  date: string;
  total: string;
  eta?: string;
}

export interface ProductionStage {
  title: string;
  completed: boolean;
  active: boolean;
  date: string;
}

export interface Quotation {
  id: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
}

export interface TechPack {
  id: string;
  title: string;
  uploaded: string;
  status: string;
  file: string;
}

export interface InvoiceRecord {
   id: string;
  date: string;
  amount: string;
  status: string;
  customer: string;
  orderId: string;
  pdfUrl: string;
}

export interface PaymentRecord {
  id: string;
  invoice: string;
  date: string;
  amount: string;
  status: string;
  method: string;
}

export interface ShipmentRecord {
  courier: string;
  tracking: string;
  status: string;
  eta: string;
  origin: string;
  destination: string;
  receiptImage?: string;
}

export interface MessageThread {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  unread: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  updated: string;
}

export interface CompanyProfile {
  companyName: string;
  industry: string;
  contactName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
}

export interface QuickAction {
  title: string;
  description: string;
  href: string;
}
